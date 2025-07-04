import React from "react";

import Metadata from "../../components/Metadata";

export default function DaNotesPage() {
    return (
        <>
            <Metadata title="DaNotes" image="/images/downloads/danotes.png" />

            <main>
                <h1>DaNotes</h1>
                <img src="/images/downloads/danotes.svg" alt="DaNotes" />
                <p>
                    こんにちは。
                    <br />
                    新しいMarkdownエディタのDaNotesです。
                </p>
                <section id="about">
                    <h2>DaNotesとは？</h2>
                    <p>
                        シンプルでかつ軽量なMarkdownエディタです。
                        <br />
                        macOSとシームレスに統合されていて、Apple Intelligenceなどの拡張機能も利用できます。
                    </p>
                    <img src="/images/downloads/danotes/window.png" alt="DaNotesのウインドウ" />
                </section>
                <section id="feature">
                    <h2>機能</h2>
                    <ul>
                        <li>
                            編集
                        </li>
                        <li>
                            プレビュー(リアルタイム)
                        </li>
                    </ul>
                </section>
                <section id="download">
                    <h2>ダウンロード</h2>
                    <a href="https://www.mediafire.com/file/ky3yrheq8gtgsav/DaNotes.app.tar.gz/file" target="_blank" rel="noopener noreferrer" className="button">
                        ダウンロード(MediaFire)
                    </a>
                </section>
            </main>
        </>
    );
}
