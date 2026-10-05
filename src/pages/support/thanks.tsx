import "../../styles/support.css";

import React from "react";
import { Link } from "waku";

import Card from "../../components/Card";
import { HeartIcon } from "../../components/Icons";
import Metadata from "../../components/Metadata";

export default function SupportThanksPage() {
    return (
        <>
            <Metadata title="ご支援ありがとうございます" noindex />

            <main>
                <div className="donate-page">
                    <Card className="donate-theme">
                        <div className="donate-center">
                            <div className="donate-icon">
                                <HeartIcon filled />
                            </div>
                            <h1>ご支援ありがとうございます</h1>
                            <p className="quote">
                                お支払いが完了しました。
                                <br />
                                いただいたご支援は、サーバーやドメインの維持など、Renorari.net の運営・開発に大切に使わせていただきます。
                            </p>
                            <div className="buttons">
                                <Link to="/" className="button short">ホームに戻る</Link>
                                <Link to="/support" className="button short secondary">支援ページに戻る</Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};
