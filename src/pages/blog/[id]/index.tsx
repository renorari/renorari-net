import "../../../styles/blog.css";

import React from "react";
import { Link } from "waku";
import { unstable_notFound } from "waku/router/server";

import Markdown from "../../../components/Markdown";
import Metadata from "../../../components/Metadata";
import { getArticleById } from "../../../utils/database";
import { markdownImage, markdownToHtml } from "../../../utils/markdown";

import type { PageProps } from "waku/router";
export default async function BlogArticlePage(
    { id }: PageProps<"/blog/[id]">
) {
    const article = await getArticleById(parseInt(id));

    if (!article) {
        return unstable_notFound();
    }

    return (
        <>
            <Metadata
                title={article.title}
                keywords={["ブログ", "記事", article.title, ...article.categories.map((category) => category.name)]}
                description={markdownToHtml(article.content).replace(/<[^>]+>/g, "").trim().substring(0, 100) + "..."}
                image={markdownImage(article.content).startsWith("http") ? markdownImage(article.content) : "https://renorari.net" + markdownImage(article.content)}
            />

            <main>
                <header>
                    <h1>
                        {article.title}
                    </h1>
                    <div className="date">
                        {new Date(article.createdAt).toDateString() !== new Date(article.updatedAt).toDateString() ? (
                            <>
                                <span className="created-at">
                                    投稿日:&nbsp;
                                    {new Date(article.createdAt).toLocaleDateString("ja-JP", {
                                        "year": "numeric",
                                        "month": "2-digit",
                                        "day": "2-digit"
                                    })}
                                </span>
                                <span className="updated-at">
                                    最終更新:&nbsp;
                                    {new Date(article.updatedAt).toLocaleDateString("ja-JP", {
                                        "year": "numeric",
                                        "month": "2-digit",
                                        "day": "2-digit"
                                    })}
                                </span>
                            </>
                        ) : (
                            <span className="created-at">
                                投稿日:&nbsp;
                                {new Date(article.createdAt).toLocaleDateString("ja-JP", {
                                    "year": "numeric",
                                    "month": "2-digit",
                                    "day": "2-digit"
                                })}
                            </span>
                        )}
                    </div>
                    <div className="categories">
                        {article.categories.map((category) => (
                            <Link key={category.id} className="category" to={`/blog/category/${category.id}`}>
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </header>

                <article>
                    <Markdown contentMD={article.content} />
                </article>
            </main>
        </>
    );
}