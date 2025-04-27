import React from "react";

import BlogList from "../../components/BlogList";
import Metadata from "../../components/Metadata";

export default function BlogPage() {
    return (
        <>
            <Metadata title="ブログ" description="私のブログ記事を共有しています。" keywords={["ブログ", "記事"]} />

            <main>
                <h1>ブログ</h1>
                <p>
                    ようこそ！
                    ここでは私のブログ記事を共有しています。
                    <br />
                    最新の記事や興味深いトピックをぜひチェックしてみてください。
                </p>
                <BlogList />
            </main>
        </>
    );
}
 