import React from "react";

import CardList from "../components/CardList";
import ImageCard from "../components/ImageCard";
import { Article, getArticles } from "../utils/database";
import { markdownImage } from "../utils/markdown";

interface BlogListProps {
    amount?: number;
    articles?: Article[];
}

export default async function BlogList({ amount, articles }: BlogListProps) {
    const displayArticles = articles ? articles : await getArticles();

    return (
        <CardList>
            {displayArticles
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
