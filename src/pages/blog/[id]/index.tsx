import "../../../styles/blog.css";

import React from "react";
import { Link } from "waku";
import { unstable_notFound } from "waku/router/server";

import Markdown from "../../../components/Markdown";
import Metadata from "../../../components/Metadata";
import { getArticleById } from "../../../utils/database";
import { markdownImage } from "../../../utils/markdown";

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
            <Metadata title={article.title} keywords={["ブログ", "記事", article.title, ...article.categories.map((category) => category.name)]} image={markdownImage(article.content).startsWith("http") ? markdownImage(article.content) : "https://renorari.net" + markdownImage(article.content)} />

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