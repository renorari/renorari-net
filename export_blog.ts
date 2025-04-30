// Blog Exporter

import "dotenv/config";

import { randomUUID } from "crypto";
import fs from "fs/promises";
import { loadEsm } from "load-esm";
import mysql from "mysql2/promise";
import path from "path";

import extractYAMLAndMD from "./modules/extract_yaml_and_md";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// blogフォルダ内の.mdファイルをすべて取得(再帰的に取得)
async function getArticles() {
    const articles: string[] = [];
    async function readDir(dir: string) {
        const files = await fs.readdir(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
                await readDir(filePath);
            } else if (file.endsWith(".md")) {
                articles.push(filePath);
            }
        }
    }
    await readDir("blog");
    return articles;
}

// 記事を読み込み構造化
interface ArticleData {
    path: string;
    title: string;
    content: string;
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface ArticleInfo {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    coverImage: string | undefined;
}


async function parseArticles(MDpath: string): Promise<ArticleData> {
    const content = await fs.readFile(MDpath, "utf-8");
    const extracted = extractYAMLAndMD(content);
    const info = extracted.yaml as ArticleInfo;
    const contentMd = extracted.md;

    // categoryとtagを合わせて重複を削除
    const categories = [...new Set(info.categories.concat(info.tags))];

    // 記事の作成日時と更新日時を取得
    const createdAt = new Date(info.date);
    const updatedAt = new Date(info.date);

    // 記事のタイトルを取得
    const title = info.title;

    return {
        path: MDpath,
        title,
        content: contentMd,
        categories,
        createdAt,
        updatedAt
    };
}

// 記事に使われているmd以外のファイルを取得し、データセット化
async function getFiles() {
    const files: string[] = [];
    async function readDir(dir: string) {
        const filesInDir = await fs.readdir(dir);
        for (const file of filesInDir) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
                await readDir(filePath);
            } else if (!file.endsWith(".md")) {
                files.push(filePath);
            }
        }
    }
    await readDir("blog");
    return files;
}

// ファイルをアップロード
const uploadedFiles: Map<string, string> = new Map();
async function uploadFile(filePath: string) {
    // uuidを生成
    const fileName = randomUUID();
    const data = await fs.readFile(filePath);
    // mimeTypeを取得
    const { fileTypeFromFile } = await loadEsm<typeof import("file-type")>("file-type");
    const fileType = await fileTypeFromFile(filePath);
    const mimeType = fileType ? fileType.mime : "application/octet-stream";

    // ファイルをアップロード
    await pool.query("INSERT INTO files (name, content_type, data) VALUES (?, ?, ?)", [
        fileName,
        mimeType,
        data
    ]);

    uploadedFiles.set(filePath, `/api/files/${fileName}`);
    console.log(`Uploaded file: ${filePath} as ${fileName}`);

    return uploadedFiles.get(filePath);
}

// カテゴリを最適化
const optimizedCategories: Map<string, number> = new Map();
async function addCategory(category: string) {
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM categories WHERE name = ?", [category.toLowerCase()]);
    if (rows.length > 0) {
        return rows[0].id;
    }
    const [result] = await pool.query("INSERT INTO categories (name) VALUES (?)", [category.toLowerCase()]);
    const categoryId = (result as mysql.ResultSetHeader).insertId;
    optimizedCategories.set(category.toLowerCase(), categoryId);
    return categoryId;
}

// 記事アップロード
async function uploadArticle(article: ArticleData) {
    const { title, content: rawContent, categories, createdAt, updatedAt, path: DirPath } = article;

    let processedContent = rawContent.trim();
    // 各ファイルパスを置換
    for (const [filePath, fileUrl] of uploadedFiles.entries()) {
        // [./images/ogp.png] -> [12345678-12345678-1234-1234-1234-123456789012]
        // [images/ogp.png] -> [12345678-12345678-1234-1234-1234-123456789012]
        // filePathにはフォルダのパスが含まれているので、相対的にするために置換する
        const relativePath = path.relative(path.dirname(DirPath), filePath);
        processedContent = processedContent.replace(new RegExp("./" + relativePath, "g"), fileUrl);
        processedContent = processedContent.replace(new RegExp(relativePath, "g"), fileUrl);
        processedContent = processedContent.replace(new RegExp("./" + encodeURI(relativePath), "g"), fileUrl);
        processedContent = processedContent.replace(new RegExp(encodeURI(relativePath), "g"), fileUrl);
        processedContent = processedContent.replace(new RegExp("./" + decodeURI(relativePath), "g"), fileUrl);
        processedContent = processedContent.replace(new RegExp(decodeURI(relativePath), "g"), fileUrl);
        
    }

    // カテゴリを最適化
    const categoryIds: number[] = [];
    for (const category of categories) {
        const categoryId = await addCategory(category);
        categoryIds.push(categoryId);
    }

    // 記事をアップロード
    const [result] = await pool.query("INSERT INTO articles (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)", [
        title,
        processedContent,
        createdAt,
        updatedAt
    ]);
    const articleId = (result as mysql.ResultSetHeader).insertId;

    // 記事とカテゴリの関連付け
    for (const categoryId of categoryIds) {
        await pool.query("INSERT INTO articles_categories (article_id, category_id) VALUES (?, ?)", [
            articleId,
            categoryId
        ]);
    }

    // 記事のIDを返す
    return articleId;
}

// 進捗表示関数
function showProgress(current: number, total: number, label: string) {
    const percent = Math.floor((current / total) * 100);
    const progressBar = "█".repeat(Math.floor(percent / 2)) + "░".repeat(50 - Math.floor(percent / 2));
    process.stdout.write(`\r${label}: [${progressBar}] ${percent}% (${current}/${total})\n`);
    if (current === total) {
        process.stdout.write("\n");
    }
}

(async () => {
    console.log("Exporting blog articles...");
    const articles = await getArticles();
    console.log(`Found ${articles.length} articles.`);
    console.log(articles);

    const articleData: ArticleData[] = [];
    for (let i = 0; i < articles.length; i++) {
        const data = await parseArticles(articles[i]);
        articleData.push(data);
        showProgress(i + 1, articles.length, "Parsing articles");
    }

    console.log("\nExporting files...");
    const files = await getFiles();
    console.log(`Found ${files.length} files.`);
    console.log(files);

    for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i]);
        showProgress(i + 1, files.length, "Uploading files");
    }
    console.log("\nFiles uploaded.");

    console.log("Uploading articles...");
    for (let i = 0; i < articleData.length; i++) {
        await uploadArticle(articleData[i]);
        showProgress(i + 1, articleData.length, "Uploading articles");
    }
    console.log("\nArticles uploaded.");
    console.log("Export completed.");
})();
