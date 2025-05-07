import React from "react";

import Metadata from "../../components/Metadata";
import DownloadsList from "../../components/DownloadsList";

export default function ToolsListPage() {
    return (
        <>
            <Metadata title="ダウンロード" description="れのらりが作成したUSTなどのダウンロード集です。" keywords={["ダウンロード", "UST", "instrumental"]} />
            <main>
                <h1>
                    ダウンロード
                </h1>
                <p>
                    れのらりが作成したUSTなどのダウンロード集です。
                    <br />
                    ぜひ、ご活用ください。
                </p>
                <DownloadsList />
            </main>
        </>
    );
}