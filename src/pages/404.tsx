import React from "react";

import Metadata from "../components/Metadata";

export default function ContactPage() {
    return (
        <>
            <Metadata title="404 Not Found" noindex />

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