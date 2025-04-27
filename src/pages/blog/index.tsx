import React from "react";

import BlogList from "../../components/BlogList";

export default function BlogPage() {
    return (
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
    );
}
 