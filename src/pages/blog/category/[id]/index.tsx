import React from "react";
import { PageProps } from "waku/router";

export default async function BlogPage(
    {id}: PageProps<"/blog/category/[id]">
) {
    return (
        <main>
            <h2>カテゴリ</h2>
            <p>カテゴリの詳細ページです。</p>
            <p>カテゴリID: {id}</p>
        </main>
    );
}
