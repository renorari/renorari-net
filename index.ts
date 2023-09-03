import fs from "node:fs";
import express from "express";
import generateErrorPage from "./modules/generate_error_page";

const redirects = JSON.parse(fs.readFileSync("./redirects.json", "utf-8"));

const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.static("public"));
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
            res.send(html.replace(/{{content}}/g, contentHtml).replace(/{{title}}/g, title));
        }
    });
});

server.listen(PORT, () => {
    console.log("Server is started on http://localhost:" + PORT);
});