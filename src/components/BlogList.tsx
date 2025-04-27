import React from "react";

import { getArticles } from "../utils/database";
import CardList from "../components/CardList";
import ImageCard from "../components/ImageCard";
import { markdownImage } from "../utils/markdown";

interface BlogListProps {
    amount?: number;
}

export default async function BlogList({ amount }: BlogListProps) {
    const articles = await getArticles();

    return (
        <CardList>
            {articles
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, amount)
                .map((article) => (
                    <ImageCard
                        key={article.id}
                        link={`/blog/${article.id}`}
                        title={article.title}
                        image={markdownImage(article.content)}
                    />
                ))}
        </CardList>
    );
}
