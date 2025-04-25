import React from "react";
import "./FullscreenHeader.css";

export default function Header() {
    return (
        <header className="fullscreen">
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
