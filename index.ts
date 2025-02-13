import fs from "node:fs";
import cp from "node:child_process";
import dotenv from "dotenv";
import express from "express";
import { JSDOM } from "jsdom";
import * as dateFns from "date-fns";
import marked from "marked";
import { WebhookClient } from "discord.js";
import * as githubWebhooks from "@octokit/webhooks";
import generateErrorPage from "./modules/generate_error_page";
import extractJSONAndHTML from "./modules/extract_json_and_html";
import extractYAMLAndMD from "./modules/extract_yaml_and_md";
import unicodeEscape from "./modules/unicode_escape";
import toRFC822 from "./modules/date_toRFC822";

dotenv.config();

const redirects = JSON.parse(fs.readFileSync("./redirects.json", "utf-8"));
const html = fs.readFileSync("./public/page.html", "utf-8");

interface blogInfo {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    coverImage: string | undefined;
}

interface UserCollection {
    [key: string]: {
        userId: string;
        reason: string;
    };
}

const PORT = process.env.PORT ?? 3000;
const server = express();
const webhooks = new githubWebhooks.Webhooks({
    secret: process.env.GITHUB_WEBHOOK_SECRET ?? ""
});
const discordWebhookClient = new WebhookClient({ "id": process.env.DISCORD_WEBHOOK_ID ?? "", "token": process.env.DISCORD_WEBHOOK_TOKEN ?? "" });

const kanaUrl = process.env.KANA_URL ?? "https://kana.renorari.net";
let nrUsers: UserCollection = {};
let nrGuilds: UserCollection = {};
let ugcMutedUsers: UserCollection = {};
let ugcMutedGuilds: UserCollection = {};
let takasumibotMuted: UserCollection = {};
async function blockedUserCollectionUpdate() {
    fetch(`${kanaUrl}/api/v2/discord/nr_users`).then((response) => {
        response.ok && response.json().then((json) => {
            nrUsers = json;
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
    fetch(`${kanaUrl}/api/v2/discord/nr_guilds`).then((response) => {
        response.ok && response.json().then((json) => {
            nrGuilds = json;
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
    fetch(`${kanaUrl}/api/v2/discord/muted_users`).then((response) => {
        response.ok && response.json().then((json) => {
            ugcMutedUsers = json;
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
    fetch(`${kanaUrl}/api/v2/discord/muted_guilds`).then((response) => {
        response.ok && response.json().then((json) => {
            ugcMutedGuilds = json;
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
    fetch("https://api.takasumibot.com/v1/mute_user").then((response) => {
        response.ok && response.json().then((json: { success: boolean; message: string | null; data: { id: string; reason: string; time: string; }[]; }) => {
            takasumibotMuted = {};
            json.data.forEach((user) => {
                takasumibotMuted[user.id] = { userId: user.id, reason: user.reason };
            });
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
}
blockedUserCollectionUpdate();
setInterval(blockedUserCollectionUpdate, 1000 * 60);

webhooks.on("push", async ({ payload }) => {
    if (payload.ref === "refs/heads/main") {
        cp.execSync("git pull origin main", { cwd: __dirname });
        if (payload.commits.map(commit => commit.modified).flat().filter((path: string) => path.startsWith("blog/")).length > 0) {
            const file = payload.commits.map(commit => commit.modified).flat().filter((path: string) => path.startsWith("blog/"))[0].split("/")[1];
            const content = fs.readFileSync("./blog/" + file + "/index.md", "utf-8");
            const extracted = extractYAMLAndMD(content);
            const info = extracted.yaml as blogInfo;
            const contentMd = extracted.md;
            const contentHtml = marked.parse(contentMd);
            const document = new JSDOM(contentHtml);
            const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 200) ?? "";
            const imageDir = file;
            const image = info.coverImage ? `https://renorari.net/blog/${imageDir}/images/${info.coverImage}` : contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "") ? `https://renorari.net/blog/${imageDir}/${contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "").replace("./", "")}` : "https://renorari.net/images/ogp.png";
            discordWebhookClient.send({
                content: `<@&1089541200958197820> ブログが更新されました!\n# [${info.title}](https://renorari.net/blog/${file}/)`,
                embeds: [{
                    title: info.title,
                    description: description + "...",
                    url: "https://renorari.net/blog/" + file + "/",
                    image: {
                        url: image
                    }
                }]
            });
        }
        if (payload.commits.map(commit => commit.message).join("\n").match(/!rs/)) {
            cp.execSync("npm install", { cwd: __dirname });
            process.exit();
        }
    }
});

server.use(githubWebhooks.createNodeMiddleware(webhooks));
server.use(express.static("public"));

server.use((req, res, next) => {
    if (!req.url.includes(".") && !req.url.endsWith("/")) {
        res.redirect(301, req.url + "/");
    }
    next();
});

server.get("/blog/", (req, res) => {
    const files = fs.readdirSync("./blog").filter((file) => fs.statSync("./blog/" + file).isDirectory())
        .sort((a, b) => {
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
            const imageDir = file;
            const image = info.coverImage ? `/blog/${imageDir}/images/${info.coverImage}` : contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "") ? `/blog/${imageDir}/${contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "").replace("./", "")}` : "https://renorari.net/images/ogp.png";
            return `<a href="/blog/${file}/" class="card"><div class="card-image"><img src="${image}" alt="ogp image"></div><div class="card-content"><div class="card-title">${info.title}</div><div class="card-description">${description}...</div></div></a>`;
        });
    res.send(html.replace(/{{content}}/g, `<main><div class="panel">${files.join("")}</main>`).replace(/{{title-full}}/g, "{{title}}").replace(/{{title}}/g, "ブログ").replace(/{{description}}/g, "ブログの一覧です。").replace(/{{path}}/g, "/blog/").replace(/{{ogp_image}}/g, "https://renorari.net/images/ogp.png"));
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
            const dateText = new Date(info.date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
            const contentHtml = `<h1 class="blog-title">${info.title}</h1>\n<div class="update-date">最終更新: ${dateText}</div>` + marked.parse(contentMd);
            const document = new JSDOM(contentHtml);
            const description = document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 100) ?? "";
            const tags = info.tags.join(", ") + ", " + info.categories.join(", ");
            const imageDir = requestPath.replace("/blog/", "").split("/").slice(0, -1).join("/");
            const image = info.coverImage ? `https://renorari.net/blog/${imageDir}/images/${info.coverImage}` : contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "") ? `https://renorari.net/blog/${imageDir}/${contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "").replace("./", "")}` : "https://renorari.net/images/ogp.png";
            res.send(html.replace(/{{content}}/g, `<main>${contentHtml}</main>`).replace(/{{title}}/g, "ブログ").replace(/{{title-full}}/g, info.title).replace(/{{description}}/g, description + "...").replace(/{{path}}/g, requestPath.replace("index.md", "")).replace(/{{ogp_image}}/g, image).replace(/{{tags}}/g, tags));
        }
    });
});

server.get("/api/block-checker/:id", (req, res) => {
    const id = req.params.id;
    const kana = Object.keys(nrUsers).includes(id) || Object.keys(nrGuilds).includes(id);
    const ugc = Object.keys(ugcMutedUsers).includes(id) || Object.keys(ugcMutedGuilds).includes(id);
    const takasumibot = Object.keys(takasumibotMuted).includes(id);
    res.json({
        kana, ugc, takasumibot,
        kana_is_removable: Object.keys(nrUsers).includes(id) ? (nrUsers[id].reason.includes("荒らし関連のユーザー") ? true : false) : null
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
        return `<url><loc>https://renorari.net${encodeURI(url)}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
    });
    const blogUrls = fs.readdirSync("./blog").filter((file) => fs.statSync("./blog/" + file).isDirectory())
        .map((file) => {
            const content = fs.readFileSync("./blog/" + file + "/index.md", "utf-8");
            const info = extractYAMLAndMD(content).yaml as blogInfo;
            const url = "/blog/" + file + "/";
            const lastmod = info.date;
            return `<url><loc>https://renorari.net${encodeURI(url)}</loc><lastmod>${lastmod}</lastmod><priority>0.8</priority></url>`;
        });
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}${blogUrls.join("")}</urlset>`;
    res.header("Content-Type", "text/xml");
    res.send(xml);
});

server.get("/rss.xml", (req, res) => {
    const getFiles = (dir: string): string[] => {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        const files = dirents.map((dirent) => {
            const res = dir + "/" + dirent.name;
            return dirent.isDirectory() ? getFiles(res) : res;
        });
        return Array.prototype.concat(...files);
    };
    const files = getFiles("./views");
    const items = files.filter((file) => file.endsWith(".html")).map((file) => {
        const content = fs.readFileSync(file, "utf-8");
        const extracted = extractJSONAndHTML(content);
        const url = file.replace("./views", "").replace("index.html", "");
        const lastmod = toRFC822(fs.statSync(file).mtime);
        const title = unicodeEscape(extracted.json.title ?? "");
        return `<item><title>${title}</title><link>https://renorari.net${encodeURI(url)}</link><guid>https://renorari.net${encodeURI(url)}</guid><pubDate>${lastmod}</pubDate></item>`;
    });
    const blogItems = fs.readdirSync("./blog").filter((file) => fs.statSync("./blog/" + file).isDirectory())
        .map((file) => {
            const content = fs.readFileSync("./blog/" + file + "/index.md", "utf-8");
            const info = extractYAMLAndMD(content).yaml as blogInfo;
            const url = "/blog/" + file + "/";
            const lastmod = toRFC822(new Date(info.date));
            const title = unicodeEscape(info.title);
            return `<item><title>${title}</title><link>https://renorari.net${encodeURI(url)}</link><guid>https://renorari.net${encodeURI(url)}</guid><pubDate>${lastmod}</pubDate></item>`;
        });
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>renorari.net</title><link>https://renorari.net/</link><description>renorari.net</description><lastBuildDate>${toRFC822(new Date())}</lastBuildDate><atom:link href="https://renorari.net/rss.xml" rel="self" type="application/rss+xml" />${items.join("")}${blogItems.join("")}</channel></rss>`;
    res.header("Content-Type", "text/xml");
    res.send(xml);
});

server.get("/*", (req, res) => {
    let requestPath = decodeURI(req.url.endsWith("/") ? req.url + "index.html" : req.url).replace(/\.\./g, "").split("?")[0];
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
            const description = Object.keys(info).includes("description") ? info.description : (document.window.document.body.textContent?.replace(/\r\n|\r|\n/g, "").replace(/ /g, "").slice(0, 100) ?? "") + "...";
            if (content.match(/{{blog_posts}}/) !== null) {
                //最近のものを4つ表示
                const blogPosts = fs.readdirSync("./blog").filter((file) => fs.statSync("./blog/" + file).isDirectory())
                    .sort((a, b) => {
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
                        const image = contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "") ? `/blog/${file}/${contentHtml.match(/<img.*?>/)?.[0].match(/src=".*?"/)?.[0].replace(/src="|"/g, "").replace("./", "")}` : "https://renorari.net/images/ogp.png";
                        return `<a href="/blog/${file}/" class="card"><div class="card-image"><img src="${image}" alt="ogp image"></div><div class="card-content"><div class="card-title">${info.title}</div><div class="card-description">${description}...</div></div></a>`;
                    });
                contentHtml = contentHtml.replace(/{{blog_posts}}/g, blogPosts.join(""));
            }
            res.send(html.replace(/{{content}}/g, contentHtml).replace(/{{title-full}}/g, "{{title}}").replace(/{{title}}/g, info.title).replace(/{{description}}/g, description).replace(/{{path}}/g, requestPath.replace("index.html", "")).replace(/{{ogp_image}}/g, info.ogp_image).replace(/{{tags}}/g, ""));
        }
    });
});

server.listen(PORT, () => {
    console.log("Server is started on http://127.0.0.1:" + PORT);
});