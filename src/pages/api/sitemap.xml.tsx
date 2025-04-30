import { getCategories, getArticles } from "../../utils/database";

interface Page {
    url: string;
    lastModified?: Date;
    changeFrequency?: string;
    priority: number;
}

function w3cDateTime(date: Date): `${number}-${string}-${string}` {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
}

export const GET = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const baseUrl = url.origin;

    const staticPages: Page[] = [
        {
            "url": "/",
            "changeFrequency": "daily",
            "priority": 1.0
        },
        {
            "url": "/about",
            "changeFrequency": "monthly",
            "priority": 0.9
        },
        {
            "url": "/contact",
            "changeFrequency": "monthly",
            "priority": 0.9
        },
        {
            "url": "/legal/disclaimer",
            "changeFrequency": "monthly",
            "priority": 0.5
        },
        {
            "url": "/legal/privacy",
            "changeFrequency": "monthly",
            "priority": 0.5
        },
        {
            "url": "/tools",
            "changeFrequency": "weekly",
            "priority": 0.9
        },
        {
            "url": "/tools/aspect",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/tools/beep",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/tools/block-checker",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/tools/discord-channel",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/tools/generator",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/tools/qr",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/tools/thumbnail-maker",
            "changeFrequency": "weekly",
            "priority": 0.8
        },
        {
            "url": "/blog",
            "changeFrequency": "weekly",
            "priority": 0.9
        }
    ];

    const blogArticles = await getArticles();
    const blogPages: Page[] = blogArticles.map((article) => {
        const lastModified = new Date(article.updatedAt);
        const changeFrequency = "weekly";
        const priority = 0.8;
        return {
            "url": `/blog/${article.id}`,
            lastModified,
            changeFrequency,
            priority
        };
    });

    const blogCategories = await getCategories();
    const categoryPages: Page[] = blogCategories.map((category) => {
        const lastModified = new Date(category.updatedAt);
        const changeFrequency = "weekly";
        const priority = 0.7;
        return {
            "url": `/blog/category/${category.id}`,
            lastModified,
            changeFrequency,
            priority
        };
    });

    const pages = [...staticPages, ...blogPages, ...categoryPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(
            (page) => `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        ${page.lastModified ? `<lastmod>${w3cDateTime(page.lastModified)}</lastmod>` : ""}
        ${page.changeFrequency ? `<changefreq>${page.changeFrequency}</changefreq>` : ""}
        <priority>${page.priority}</priority>
    </url>`
        )
        .join("")}
</urlset>`;

    return new Response(sitemap, {
        "headers": {
            "Content-Type": "application/xml"
        }
    });
};
