import "../styles/main.css";

import React, { ReactNode } from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="ja">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1265980632516511" crossOrigin="anonymous"></script>
            </head>
            <body>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}