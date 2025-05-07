"use client";
import React, { useState } from "react";

import Metadata from "../../components/Metadata";
import { Link } from "waku";

export default function GoluboiVagonPage() {
    const [showDownload, setShowDownload] = useState(false);

    const handleOpenLicense = () => {
        window.open("/licenses/ust/1", "_blank");
        setShowDownload(true);
    };

    return (
        <>
            <Metadata title="UST Inst配布 Голубой вагон(青い列車 日本語バージョン)" image="/images/downloads/goluboi-vagon.png" />

            <main>
                <h1>
                    Голубой вагон(青い列車 日本語バージョン)
                </h1>
                <div>
                    このページでは、Голубой вагон(青い列車 日本語バージョン)のUST Instを配布しています。
                    <br />
                    このUST Instは、<Link to="/licenses/ust/1" target="_blank" rel="noopener noreferrer">UST素材配布利用規約 第1版</Link>が適用されます。
                    <br />
                    必ずご確認ください。
                </div>
                <div id="downloads" className="buttons">
                    <button onClick={handleOpenLicense} className={showDownload ? "secondary" : ""}>利用規約を開く</button>
                    {showDownload &&
                        <a className="button" href="https://www.mediafire.com/file/65ctlcq3ov6gc7b/goluboi-vagon-jpn.zip/file" target="_blank" rel="noopener noreferrer">
                            利用規約に同意してダウンロード
                        </a>
                    }
                </div>
            </main>
        </>
    );
}
