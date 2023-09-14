import fs from "node:fs";
import dotenv from "dotenv";
import express from "express";
import {JSDOM} from "jsdom";
import * as dateFns from "date-fns";
import marked from "marked";
import generateErrorPage from "./modules/generate_error_page";
import extractJSONAndHTML from "./modules/extract_json_and_html";
import extractYAMLAndMD from "./modules/extract_yaml_and_md";

dotenv.config();

const redirects = JSON.parse(fs.readFileSync("./redirects.json", "utf-8"));
const html = fs.readFileSync("./public/page.html", "utf-8");

interface blogInfo {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
}

const PORT = process.env.PORT ?? 3000;
const server = express();

server.use(express.static("public"));

server.get("/blog/", (req, res) => {
    const files = fs.readdirSync("./blog").sort((a, b) => {
        const contentA = fs.readFileSync("./blog/" + a + "/index.md", "utf-8");
        const extractedA = extractYAMLAndMD(contentA);
        const infoA = extractedA.yaml as blogInfo;
        const dateA = new Date(infoA.date);
        const contentB = fs.readFileSync("./blog/" + b + "/index.md", "utf-8");
        const extractedB = extractYAMLAndMD(contentB);
        const infoB = extractedB.yaml as blogInfo;
        const dateB = new Date(infoB.date);
        return dateA > dateB ? -1 : 1;
    }).map((file) => {
        const content = fs.readFileSync("./blog/" + file + "/index.md", "utf-8");
        const extracted = extractYAMLAndMD(content);
        const info = extracted.yaml as blogInfo;
        const contentMd = extracted.md;
        const contentHtml = marked.parse(contentMd);
        const document = new JSDOM(contentHtml);
        const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 200) ?? "";
        const image = contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "") ? `/blog/${file}/${contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "")}` : "https://renorari.net/images/ogp.png";
        return `<a href="/blog/${file}/" class="card"><div class="card-image"><img src="${image}" alt="ogp image"></div><div class="card-content"><div class="card-title">${info.title}</div><div class="card-description">${description}...</div></div></a>`;
    });
    res.send(html.replace(/{{content}}/g, `<main><div class="panel">${files.join("")}</main>`).replace(/{{title}}/g, "ブログ").replace(/{{description}}/g, "ブログの一覧です。").replace(/{{path}}/g, "/blog/").replace(/{{ogp_image}}/g, "https://renorari.net/images/ogp.png"));
});

server.get("/blog/*", (req, res) => {
    const requestPath = decodeURI(req.url.endsWith("/") ? req.url + "index.md" : req.url).replace(/\.\./g, "");
    const contentPath = requestPath.replace("/blog/", "./blog/");
    if (!contentPath.endsWith(".md")) {
        fs.readFile(contentPath, (error, content) => {
            if (error) {
                switch (error.code) {
                case "ENOENT":
                    res.send(generateErrorPage(404));
                    break;
                default:
                    res.send(generateErrorPage(500));
                    break;
                }
            } else {
                res.type(express.static.mime.lookup(contentPath));
                res.send(content);
            }
        });
        return;
    }

    fs.readFile(contentPath, "utf-8", (error, content) => {
        if (error) {
            switch (error.code) {
            case "ENOENT":
                res.send(generateErrorPage(404));
                break;
            default:
                res.send(generateErrorPage(500));
                break;
            }
        } else {
            const extracted = extractYAMLAndMD(content);
            const info = extracted.yaml as blogInfo;
            const contentMd = extracted.md;
            const contentHtml = marked.parse(contentMd);
            const document = new JSDOM(contentHtml);
            const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 100) ?? "";
            const tags = info.tags.join(", ") + ", " + info.categories.join(", ");
            res.send(html.replace(/{{content}}/g, `<main>${contentHtml}</main>`).replace(/{{title}}/g, info.title).replace(/{{description}}/g, description + "...").replace(/{{path}}/g, requestPath).replace(/{{ogp_image}}/g, "https://renorari.net/images/ogp.png").replace(/{{tags}}/g, tags));
        }
    });
});

server.get("*", (req, res, next) => {
    const short = redirects.short.filter((redirect: { from: string; to: string; }) => redirect.from == req.hostname + req.url)[0];
    if (short) {
        res.redirect(301, short.to);
    } else {
        next();
    }
});

server.get("/sitemap.xml", (req, res) => {
    const getFiles = (dir: string): string[] => {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        const files = dirents.map((dirent) => {
            const res = dir + "/" + dirent.name;
            return dirent.isDirectory() ? getFiles(res) : res;
        });
        return Array.prototype.concat(...files);
    };
    const files = getFiles("./views");
    const urls = files.filter((file) => file.endsWith(".html")).map((file) => {
        const url = file.replace("./views", "").replace("index.html", "");
        const lastmod = dateFns.format(fs.statSync(file).mtime, "yyyy-MM-dd");
        const priority = Math.max(1 - (url.split("/").length - 2) * 0.1, 0.5);
        return `<url><loc>https://renorari.net${url}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
    });
    const blogUrls = fs.readdirSync("./blog").map((file) => {
        const url = "/blog/" + file.replace(".md", "");
        const lastmod = dateFns.format(fs.statSync("./blog/" + file).mtime, "yyyy-MM-dd");
        return `<url><loc>https://renorari.net${url}</loc><lastmod>${lastmod}</lastmod><priority>0.8</priority></url>`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}${blogUrls.join()}</urlset>`;
    res.header("Content-Type", "text/xml");
    res.send(xml);
});

server.get("/*", (req, res) => {
    let requestPath = decodeURI(req.url.endsWith("/") ? req.url + "index.html" : req.url).replace(/\.\./g, "");
    const redirect = redirects.locate.filter((redirect: { from: string; to: string; }) => redirect.from == requestPath)[0];
    (redirect) && (requestPath = redirect.to);
    const contentPath = requestPath.replace("/", "./views/");
    fs.readFile(contentPath, "utf-8", (error, content) => {
        if (error) {
            switch (error.code) {
            case "ENOENT":
                res.send(generateErrorPage(404));
                break;
            default:
                res.send(generateErrorPage(500));
                break;
            }
        } else {
            const extracted = extractJSONAndHTML(content);
            const info = extracted.json;
            let contentHtml = extracted.html;
            const document = new JSDOM(contentHtml);
            const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 100) ?? "";
            if (content.match(/{{blog_posts}}/) !== null) {
                //最近のものを4つ表示
                const blogPosts = fs.readdirSync("./blog").sort((a, b) => {
                    const contentA = fs.readFileSync("./blog/" + a + "/index.md", "utf-8");
                    const extractedA = extractYAMLAndMD(contentA);
                    const infoA = extractedA.yaml as blogInfo;
                    const dateA = new Date(infoA.date);
                    const contentB = fs.readFileSync("./blog/" + b + "/index.md", "utf-8");
                    const extractedB = extractYAMLAndMD(contentB);
                    const infoB = extractedB.yaml as blogInfo;
                    const dateB = new Date(infoB.date);
                    return dateA > dateB ? -1 : 1;
                }).slice(0, 4).map((file) => {
                    const content = fs.readFileSync("./blog/" + file + "/index.md", "utf-8");
                    const extracted = extractYAMLAndMD(content);
                    const info = extracted.yaml as blogInfo;
                    const contentMd = extracted.md;
                    const contentHtml = marked.parse(contentMd);
                    const document = new JSDOM(contentHtml);
                    const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 200) ?? "";
                    const image = contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "") ? `/blog/${file}/${contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "")}` : "https://renorari.net/images/ogp.png";
                    return `<a href="/blog/${file}/" class="card"><div class="card-image"><img src="${image}" alt="ogp image"></div><div class="card-content"><div class="card-title">${info.title}</div><div class="card-description">${description}...</div></div></a>`;
                });
                contentHtml = contentHtml.replace(/{{blog_posts}}/g, blogPosts.join(""));
            }
            res.send(html.replace(/{{content}}/g, contentHtml).replace(/{{title}}/g, info.title).replace(/{{description}}/g, description + "...").replace(/{{path}}/g, requestPath).replace(/{{ogp_image}}/g, info.ogp_image).replace(/{{tags}}/g, ""));
        }
    });
});

server.listen(PORT, () => {
    console.log("Server is started on http://localhost:" + PORT);
});