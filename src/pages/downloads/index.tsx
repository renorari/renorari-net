import React from "react";

import Metadata from "../../components/Metadata";
import DownloadsList from "../../components/DownloadsList";
import { Link } from "waku";

export default function ToolsListPage() {
    return (
        <>
            <Metadata title="ダウンロード" description="れのらりが作成したUSTやアプリなどのダウンロード集です。" keywords={["ダウンロード", "UST", "instrumental", "アプリ", "ソフト", "アプリケーション", "ソフトウエア", "app", "application", "software"]} />
            <main>
                <section id="list">
                    <h1>
                        ダウンロード
                    </h1>
                    <p>
                        れのらりが作成したUSTやアプリなどのダウンロード集です。
                        <br />
                        ぜひ、ご活用ください。
                    </p>
                    <DownloadsList />
                </section>
                <section id="licences">
                    <h2>ライセンス</h2>
                    <p>
                        上記ファイルのいずれかに適用されるライセンスです。
                        <br />
                        リンク切れ等ありましたら、<Link to="/contact" target="_blank" rel="noopener noreferrer">お問い合わせ</Link>にご連絡いただき、以下よりご確認ください。
                        <ul>
                            <li>
                                <Link to="/licenses/ust/1" target="_blank" rel="noopener noreferrer">UST配布利用規約 第1版</Link>
                            </li>
                            <li>
                                <Link to="/licenses/video/1" target="_blank" rel="noopener noreferrer">動画素材配布利用規約 第1版</Link>
                            </li>
                        </ul>
                    </p>
                </section>
            </main>
        </>
    );
}