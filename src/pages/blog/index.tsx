import React from "react";

import {getArticles} from "../../utils/database";
import CardList from "../../components/CardList";
import ImageCard from "../../components/ImageCard";
import { markdownImage } from "../../utils/markdown";

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <main>
            <h2>ブログ</h2>
            <p>私のブログです。</p>
            <CardList>
                {articles.map((article) => (
                    <ImageCard
                        key={article.id}
                        link={`/blog/${article.id}`}
                        title={article.title}
                        image={markdownImage(article.content)}
                    />
                ))}
            </CardList>
        </main>
    );
}
 