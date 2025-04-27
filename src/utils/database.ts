"use server";

import mysql from "mysql2/promise";

/**
 * データベース接続プールの設定
 */
const pool = mysql.createPool({
    "host": process.env.DB_HOST || "localhost",
    "port": parseInt(process.env.DB_PORT || "3306", 10),
    "user": process.env.DB_USER || "",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DB_NAME || "renorarinet",
    "waitForConnections": true,
    "connectionLimit": 10,
    "queueLimit": 0,
    "namedPlaceholders": true,
    "dateStrings": true,
    "multipleStatements": true,
    "debug": false
});

/**
 * データベースの初期化
 * 必要なテーブルが存在しない場合は作成する
 */
const initDatabase = async (): Promise<void> => {
    const tables = [
        `CREATE TABLE IF NOT EXISTS \`articles\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            \`title\` VARCHAR(255) NOT NULL, 
            \`content\` TEXT NOT NULL, 
            \`deleted\` BOOLEAN DEFAULT FALSE, 
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP, 
            \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS \`categories\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            \`name\` VARCHAR(255) NOT NULL UNIQUE, 
            \`deleted\` BOOLEAN DEFAULT FALSE, 
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP, 
            \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS \`articles_categories\` (
            \`article_id\` INT NOT NULL, 
            \`category_id\` INT NOT NULL, 
            \`deleted\` BOOLEAN DEFAULT FALSE, 
            PRIMARY KEY (\`article_id\`, \`category_id\`), 
            FOREIGN KEY (\`article_id\`) REFERENCES \`articles\`(\`id\`) ON DELETE CASCADE, 
            FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS \`tags\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            \`name\` VARCHAR(255) NOT NULL UNIQUE, 
            \`deleted\` BOOLEAN DEFAULT FALSE, 
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP, 
            \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS \`articles_tags\` (
            \`article_id\` INT NOT NULL, 
            \`tag_id\` INT NOT NULL, 
            \`deleted\` BOOLEAN DEFAULT FALSE, 
            PRIMARY KEY (\`article_id\`, \`tag_id\`), 
            FOREIGN KEY (\`article_id\`) REFERENCES \`articles\`(\`id\`) ON DELETE CASCADE, 
            FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS \`files\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            \`name\` VARCHAR(255) NOT NULL UNIQUE, 
            \`content_type\` VARCHAR(255) NOT NULL, 
            \`data\` LONGBLOB NOT NULL, 
            \`deleted\` BOOLEAN DEFAULT FALSE, 
            \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP, 
            \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
    ];

    for (const query of tables) {
        await pool.query(query);
    }
};

// データベース初期化を実行
initDatabase().catch(err => console.error("データベース初期化エラー:", err));

/**
 * データベース接続プールを終了する
 * wakuビルド時などに呼び出すことでイベントループが終了できるようにする
 */
async function closePool(): Promise<void> {
    try {
        await pool.end();
        console.log("データベース接続プールを正常に終了しました");
    } catch (err) {
        console.error("データベース接続プールの終了中にエラーが発生しました:", err);
        throw err;
    }
}

/**
 * ビルド時に自動で終了するための設定
*/
setTimeout(() => {
    if (process.env.WAKU_BUILD === "true") {
        closePool();
    }
}, 5000);

// インターフェース定義
// --------------------

/**
 * 記事の型定義
 */
interface Article {
    id: number;
    title: string;
    content: string;
    categories: Category[];
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
}

/**
 * DB取得時の記事データの型定義
 */
interface ArticleData extends mysql.RowDataPacket {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

/**
 * カテゴリの型定義
 */
interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * DB取得時のカテゴリデータの型定義
 */
interface CategoryData extends mysql.RowDataPacket {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

/**
 * タグの型定義
 */
interface Tag {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * DB取得時のタグデータの型定義
 */
interface TagData extends mysql.RowDataPacket {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

/**
 * ファイルの型定義
 */
interface File {
    id: number;
    name: string;
    contentType: string;
    data: Buffer;
    createdAt: string;
    updatedAt: string;
}

/**
 * DB取得時のファイルデータの型定義
 */
interface FileData extends mysql.RowDataPacket {
    id: number;
    name: string;
    content_type: string;
    data: Buffer;
    created_at: string;
    updated_at: string;
}

// ヘルパー関数
// ----------

/**
 * DBのレコードを適切な型に変換する (カテゴリ)
 */
const convertCategoryData = (data: CategoryData): Category => ({
    "id": data.id,
    "name": data.name,
    "createdAt": data.created_at,
    "updatedAt": data.updated_at
});

/**
 * DBのレコードを適切な型に変換する (タグ)
 */
const convertTagData = (data: TagData): Tag => ({
    "id": data.id,
    "name": data.name,
    "createdAt": data.created_at,
    "updatedAt": data.updated_at
});

/**
 * 記事データをデータベースから取得して整形する共通関数
 */
async function formatArticleData(articleData: ArticleData): Promise<Article> {
    // カテゴリの取得
    const [categoriesData] = await pool.query<CategoryData[]>(
        "SELECT c.* FROM `categories` c INNER JOIN `articles_categories` ac ON c.id = ac.category_id WHERE ac.article_id = ? AND c.deleted = FALSE",
        [articleData.id]
    );

    // タグの取得
    const [tagsData] = await pool.query<TagData[]>(
        "SELECT t.* FROM `tags` t INNER JOIN `articles_tags` at ON t.id = at.tag_id WHERE at.article_id = ? AND t.deleted = FALSE",
        [articleData.id]
    );

    // 記事データの組み立て
    return {
        "id": articleData.id,
        "title": articleData.title,
        "content": articleData.content,
        "categories": categoriesData.map(convertCategoryData),
        "tags": tagsData.map(convertTagData),
        "createdAt": articleData.created_at,
        "updatedAt": articleData.updated_at
    };
}

const convertFileData = (data: FileData): File => ({
    "id": data.id,
    "name": data.name,
    "contentType": data.content_type,
    "data": data.data,
    "createdAt": data.created_at,
    "updatedAt": data.updated_at
});

// 記事関連の関数
// -------------

/**
 * すべての記事を取得する
 */
async function getArticles(): Promise<Article[]> {
    const [articlesData] = await pool.query<ArticleData[]>("SELECT * FROM `articles` WHERE `deleted` = FALSE ORDER BY `created_at` DESC");
    
    return Promise.all(
        articlesData.map(article => formatArticleData(article))
    );
}

/**
 * 指定IDの記事を取得する
 */
async function getArticleById(id: number): Promise<Article | null> {
    const [articlesData] = await pool.execute<ArticleData[]>(
        "SELECT * FROM `articles` WHERE `id` = ? AND `deleted` = FALSE", 
        [id]
    );

    if (articlesData.length === 0) {
        return null;
    }

    return articlesData[0] ? formatArticleData(articlesData[0]) : null;
}

/**
 * 指定カテゴリに属する記事を取得する
 */
async function getArticlesByCategory(categoryId: number): Promise<Article[]> {
    const [articlesData] = await pool.query<ArticleData[]>(
        "SELECT a.* FROM `articles` a INNER JOIN `articles_categories` ac ON a.id = ac.article_id " +
        "WHERE ac.category_id = ? AND a.deleted = FALSE ORDER BY a.created_at DESC",
        [categoryId]
    );

    return Promise.all(
        articlesData.map(article => formatArticleData(article))
    );
}

/**
 * 指定タグがついた記事を取得する
 */
async function getArticlesByTag(tagId: number): Promise<Article[]> {
    const [articlesData] = await pool.query<ArticleData[]>(
        "SELECT a.* FROM `articles` a INNER JOIN `articles_tags` at ON a.id = at.article_id " +
        "WHERE at.tag_id = ? AND a.deleted = FALSE ORDER BY a.created_at DESC",
        [tagId]
    );

    return Promise.all(
        articlesData.map(article => formatArticleData(article))
    );
}

/**
 * 新しい記事を追加する
 */
async function addArticle(title: string, content: string): Promise<number> {
    const [result] = await pool.execute(
        "INSERT INTO `articles` (`title`, `content`) VALUES (?, ?)", 
        [title, content]
    );
    return (result as mysql.ResultSetHeader).insertId;
}

/**
 * 記事を更新する
 */
async function updateArticle(id: number, title: string, content: string): Promise<void> {
    await pool.execute(
        "UPDATE `articles` SET `title` = ?, `content` = ? WHERE `id` = ?", 
        [title, content, id]
    );
}

/**
 * 記事を削除する (論理削除)
 */
async function deleteArticle(id: number): Promise<void> {
    await pool.execute(
        "UPDATE `articles` SET `deleted` = TRUE WHERE `id` = ?", 
        [id]
    );
}

// カテゴリ関連の関数
// ---------------

/**
 * 新しいカテゴリを追加する
 */
async function addCategory(name: string): Promise<number> {
    const [result] = await pool.execute(
        "INSERT INTO `categories` (`name`) VALUES (?)", 
        [name]
    );
    return (result as mysql.ResultSetHeader).insertId;
}

/**
 * カテゴリを更新する
 */
async function updateCategory(id: number, name: string): Promise<void> {
    await pool.execute(
        "UPDATE `categories` SET `name` = ? WHERE `id` = ?", 
        [name, id]
    );
}

/**
 * カテゴリを削除する (論理削除)
 */
async function deleteCategory(id: number): Promise<void> {
    await pool.execute(
        "UPDATE `categories` SET `deleted` = TRUE WHERE `id` = ?", 
        [id]
    );
}

/**
 * 記事にカテゴリを設定する
 */
async function setArticleCategory(articleId: number, categoryId: number): Promise<void> {
    await pool.execute(
        "INSERT INTO `articles_categories` (`article_id`, `category_id`) VALUES (?, ?)", 
        [articleId, categoryId]
    );
}

/**
 * 記事からカテゴリを削除する
 */
async function removeArticleCategory(articleId: number, categoryId: number): Promise<void> {
    await pool.execute(
        "DELETE FROM `articles_categories` WHERE `article_id` = ? AND `category_id` = ?", 
        [articleId, categoryId]
    );
}

// タグ関連の関数
// -----------

/**
 * 新しいタグを追加する
 */
async function addTag(name: string): Promise<number> {
    const [result] = await pool.execute(
        "INSERT INTO `tags` (`name`) VALUES (?)", 
        [name]
    );
    return (result as mysql.ResultSetHeader).insertId;
}

/**
 * タグを更新する
 */
async function updateTag(id: number, name: string): Promise<void> {
    await pool.execute(
        "UPDATE `tags` SET `name` = ? WHERE `id` = ?", 
        [name, id]
    );
}

/**
 * タグを削除する (論理削除)
 */
async function deleteTag(id: number): Promise<void> {
    await pool.execute(
        "UPDATE `tags` SET `deleted` = TRUE WHERE `id` = ?", 
        [id]
    );
}

/**
 * 記事にタグを設定する
 */
async function setArticleTag(articleId: number, tagId: number): Promise<void> {
    await pool.execute(
        "INSERT INTO `articles_tags` (`article_id`, `tag_id`) VALUES (?, ?)", 
        [articleId, tagId]
    );
}

/**
 * 記事からタグを削除する
 */
async function removeArticleTag(articleId: number, tagId: number): Promise<void> {
    await pool.execute(
        "DELETE FROM `articles_tags` WHERE `article_id` = ? AND `tag_id` = ?", 
        [articleId, tagId]
    );
}

// ファイル関連の関数
// ---------------

/**
 * ファイルを追加する
 */
async function addFile(name: string, contentType: string, data: Buffer): Promise<number> {
    const [result] = await pool.execute(
        "INSERT INTO `files` (`name`, `content_type`, `data`) VALUES (?, ?, ?)",
        [name, contentType, data]
    );
    return (result as mysql.ResultSetHeader).insertId;
}

/**
 * ファイル名でファイルを取得する
 */
async function getFileByName(name: string): Promise<File | null> {
    const [files] = await pool.execute<FileData[]>(
        "SELECT * FROM `files` WHERE `name` = ? AND `deleted` = FALSE",
        [name]
    );
    
    if (files.length === 0) {
        return null;
    }
    
    return files[0] ? convertFileData(files[0]) : null;
}

/**
 * IDでファイルを取得する
 */
async function getFileById(id: number): Promise<File | null> {
    const [files] = await pool.execute<FileData[]>(
        "SELECT * FROM `files` WHERE `id` = ? AND `deleted` = FALSE",
        [id]
    );
    
    if (files.length === 0) {
        return null;
    }
    
    return files[0] ? convertFileData(files[0]) : null;
}

/**
 * ファイルを更新する
 */
async function updateFile(id: number, name: string, contentType: string, data: Buffer): Promise<void> {
    await pool.execute(
        "UPDATE `files` SET `name` = ?, `content_type` = ?, `data` = ? WHERE `id` = ?",
        [name, contentType, data, id]
    );
}

/**
 * ファイルを削除する (論理削除)
 */
async function deleteFile(id: number): Promise<void> {
    await pool.execute(
        "UPDATE `files` SET `deleted` = TRUE WHERE `id` = ?",
        [id]
    );
}

/**
 * すべてのファイル情報を取得する (データを含まない)
 */
async function getAllFiles(): Promise<Omit<File, "data">[]> {
    const [files] = await pool.query<FileData[]>(
        "SELECT `id`, `name`, `content_type`, `created_at`, `updated_at` FROM `files` WHERE `deleted` = FALSE"
    );
    
    return files.map(file => {
        const fullFile = convertFileData({ ...file, "data": Buffer.from([]) });
        const { data: _, ...fileWithoutData } = fullFile;
        return fileWithoutData;
    });
}

// エクスポート
export {
    pool,
    closePool,
    // 記事操作
    getArticles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticlesByCategory,
    getArticlesByTag,
    // カテゴリ操作
    addCategory,
    updateCategory,
    deleteCategory,
    setArticleCategory,
    removeArticleCategory,
    // タグ操作
    addTag,
    updateTag,
    deleteTag,
    setArticleTag,
    removeArticleTag,
    // ファイル操作
    addFile,
    getFileByName,
    getFileById,
    updateFile,
    deleteFile,
    getAllFiles,

    // インターフェース
    Article,
    Category,
    Tag,
    File
};