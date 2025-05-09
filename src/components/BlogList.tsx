import React, { Fragment } from "react";

import CardList from "../components/CardList";
import ImageCard from "../components/ImageCard";
import { Article, getArticles } from "../utils/database";
import { markdownImage } from "../utils/markdown";
import CardAd from "./CardAd";

interface BlogListProps {
    amount?: number;
    articles?: Article[];
    disableAd?: boolean;
}

export default async function BlogList({ amount, articles, disableAd }: BlogListProps) {
    const displayArticles = articles ? articles : await getArticles();

    return (
        <CardList>
            {displayArticles
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, amount)
                .map((article) => (
                    <Fragment key={article.id}>
                        <ImageCard
                            link={`/blog/${article.id}`}
                            title={article.title}
                            image={markdownImage(article.content)}
                        />
                        {!disableAd && (Math.random() < 0.1) && <CardAd />}
                    </Fragment>
                ))}
        </CardList>
    );
}
