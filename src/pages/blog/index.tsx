import React from "react";

import {getArticles} from "../../utils/database";
import { Link } from "waku";

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <main>
            <h2>ブログ</h2>
            <p>私のブログです。</p>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <Link to={`/blog/${article.id}`}>
                            {article.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
