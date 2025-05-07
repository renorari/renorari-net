import {marked} from "marked";

function markdownToHtml(markdown: string): string {
    return marked.parse(markdown, {
        "async": false
    });
}

function markdownImage(markdown: string): string {
    const html = markdownToHtml(markdown);
    const image = html.match(/<img[^>]+src="([^">]+)"/);
    return image && image[1] ? image[1] : "/images/ogp.png";
}

export {
    markdownToHtml,
    markdownImage
};
