import React from "react";
import { PageProps } from "waku/router";

export default async function BlogPage(
    {id}: PageProps<"/blog/tag/[id]">
) {
    return (
        <main>
            <h2>タグ</h2>
            <p>タグの詳細ページです。</p>
            <p>タグID: {id}</p>
        </main>
    );
}
