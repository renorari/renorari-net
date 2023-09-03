import fs from "node:fs";
import dotenv from "dotenv";
import express from "express";
import {JSDOM} from "jsdom";
import generateErrorPage from "./modules/generate_error_page";

dotenv.config();

const redirects = JSON.parse(fs.readFileSync("./redirects.json", "utf-8"));

const PORT = process.env.PORT ?? 3000;
const server = express();

server.use(express.static("public"));

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
        return `<url><loc>https://renorari.net${url}</loc></url>`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
    res.header("Content-Type", "text/xml");
    res.send(xml);
});


server.get("/*", (req, res) => {
    const html = fs.readFileSync("./public/page.html", "utf-8");
    let requestPath = decodeURI(req.url.endsWith("/") ? req.url + "index.html" : req.url).replace(/\.\./g, "");
    const redirect = redirects.filter((redirect: { from: string; to: string; }) => redirect.from == requestPath)[0];
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
            const title = content.split(/\r\n|\r|\n/)[0];
            const contentHtml = content.replace(title, "");
            const document = new JSDOM(contentHtml);
            const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 100) ?? "";
            res.send(html.replace(/{{content}}/g, contentHtml).replace(/{{title}}/g, title).replace(/{{description}}/g, description + "..."));
        }
    });
});

server.listen(PORT, () => {
    console.log("Server is started on http://localhost:" + PORT);
});