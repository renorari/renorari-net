"use client";
import React, { useState } from "react";

import Metadata from "../../components/Metadata";
import { Link } from "waku";

export default function SakkijarvenPolkkaUstPage() {
    const [showDownload, setShowDownload] = useState(false);

    const handleOpenLicense = () => {
        window.open("/licenses/ust/1", "_blank");
        setShowDownload(true);
    };

    return (
        <>
            <Metadata title="UST配布 Säkkijärven Polkka" />

            <main>
                <h1>
                    Säkkijärven Polkka
                </h1>
                <div>
                    このページでは、Säkkijärven PolkkaのUSTを配布しています。
                    <br />
                    このUSTは、<Link to="/licenses/ust/1" target="_blank" rel="noopener noreferrer">UST素材配布利用規約 第1版</Link>が適用されます。
                    <br />
                    必ずご確認ください。
                </div>
                <div id="downloads" className="buttons">
                    <button onClick={handleOpenLicense} className={showDownload ? "secondary" : ""}>利用規約を開く</button>
                    {showDownload &&
                        <a className="button" href="https://www.mediafire.com/file/odp94b7ue7o49dv/sakkiyarven-polkka.zip/file" target="_blank" rel="noopener noreferrer">
                            利用規約に同意してダウンロード
                        </a>
                    }
                </div>
            </main>
        </>
    );
}
