import React from "react";
import { PageProps } from "waku/router";
import { unstable_notFound } from "waku/router/server";

import BlogList from "../../../../components/BlogList";
import Metadata from "../../../../components/Metadata";
import { getArticlesByCategory, getCategoryById } from "../../../../utils/database";

export default async function BlogCategoryPage(
    {id}: PageProps<"/blog/category/[id]">
) {
    const categoryId = parseInt(id);
    if (isNaN(categoryId)) {
        return unstable_notFound();
    }
    const category = await getCategoryById(categoryId);
    const articles = await getArticlesByCategory(categoryId);

    if (!category) {
        return unstable_notFound();
    }

    return (
        <>
            <Metadata title={`${category.name}の記事一覧`} />

            <main>
                <h1>
                    {category.name}の記事一覧
                </h1>
                <BlogList articles={articles} />
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "dynamic"
    } as const;
};
