import React from "react";
import "./FullscreenHeader.css";

export default function Header() {
    return (
        <header className="fullscreen">
            <img src="/images/header2.jpg" alt="背景画像" className="background-image" />
            <div>
                <h1>
                    <img src="/images/symbol-logo.svg" alt="🙂" width="419px" height="48px" />
                </h1>
                <p>
                    このページでは、れのらりが運営しているサービスや、ソフトウェアについて紹介しています。
                </p>
            </div>
        </header>
    );
}
