import React from "react";

import Metadata from "../components/Metadata";
import Card from "../components/Card";
import { Link } from "waku";

export default function ContactPage() {
    return (
        <>
            <Metadata title="404 Not Found" noindex />

            <div className="main-width">
                <Card title={"サイトリニューアルに伴うURL変更のお知らせ"} className="notice">
                    この度、サイトリニューアルに伴い、URLが変更となりました。<br />
                    お手数をおかけしますが、ブックマークの変更等をお願いいたします。<br />
                    なお、旧URLとのリダイレクトは行っておりませんので、何卒ご了承ください。<br />
                    詳しくは、<Link to="/blog/42">こちら</Link>をご覧ください。
                </Card>
            </div>

            <main className="center">
                <h1>
                    404
                </h1>
                <p>ページが見つかりません</p>
                <hr className="short" />
                <div className="quote">
                    進む方向を変えなければ、目指す場所にたどり着くだろう — 老子
                </div>
                <hr className="short clear" />
                <a href="/" className="button short secondary">トップに戻る</a>
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};