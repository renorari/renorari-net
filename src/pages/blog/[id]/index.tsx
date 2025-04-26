import "../../../styles/blog.css";

import React from "react";
import { Link } from "waku";
import { unstable_notFound } from "waku/router/server";

import { getArticleById } from "../../../utils/database";

import type { PageProps } from "waku/router";
export default async function BlogPage(
    { id }: PageProps<"/blog/article/[id]">
) {
    const article = await getArticleById(parseInt(id));

    if (!article) {
        return unstable_notFound();
    }

    return (
        <main>
            <header>
                <h1>
                    {article.title}
                </h1>
                <p className="date">
                    最終更新:&nbsp;
                    {new Date(article.updatedAt).toLocaleDateString("ja-JP", {
                        "year": "numeric",
                        "month": "2-digit",
                        "day": "2-digit"
                    })}
                </p>
                <div className="info">
                    <div className="categories">
                        {article.categories.map((category) => (
                            <Link key={category.id} className="category" to={`/blog/category/${category.id}`}>
                                {category.name}
                            </Link>
                        ))}
                    </div>
                    <div className="tags">
                        {article.tags.map((tag) => (
                            <Link key={tag.id} className="tag" to={`/blog/tag/${tag.id}`}>
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
        </main>
    );
}