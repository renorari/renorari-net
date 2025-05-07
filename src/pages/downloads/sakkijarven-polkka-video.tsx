"use client";
import React, { useState } from "react";

import Metadata from "../../components/Metadata";
import { Link } from "waku";

export default function SakkijarvenPolkkaVideoPage() {
    const [showDownload, setShowDownload] = useState(false);

    const handleOpenLicense = () => {
        window.open("/licenses/video/1", "_blank");
        setShowDownload(true);
    };

    return (
        <>
            <Metadata title="動画配布 Säkkijärven Polkka" image="/images/downloads/sakkijarven-polkka-video.png" />

            <main>
                <h1>
                    Säkkijärven Polkka
                </h1>
                <div>
                    このページでは、Säkkijärven Polkkaの動画素材を配布しています。
                    <br />
                    この動画素材は、<Link to="/licenses/video/1" target="_blank" rel="noopener noreferrer">動画素材配布利用規約 第1版</Link>が適用されます。
                    <br />
                    必ずご確認ください。
                </div>
                <div id="downloads" className="buttons">
                    <button onClick={handleOpenLicense} className={showDownload ? "secondary" : ""}>利用規約を開く</button>
                    {showDownload &&
                        <a className="button" href="https://www.mediafire.com/file/gac2vyaq11nt04d/sakkijarven-polkka.mp4/file" target="_blank" rel="noopener noreferrer">
                            利用規約に同意してダウンロード
                        </a>
                    }
                </div>
            </main>
        </>
    );
}
