"use client";

import "../styles/main.css";

import React, { ReactNode } from "react";
import { useRouter } from "waku";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

type RootLayoutProps = { children: ReactNode };

const baseUrl = "https://renorari.net";

export default function RootLayout({ children }: RootLayoutProps) {
    const router = useRouter();
    const location = router.path;
    const canonicalUrl = `${baseUrl}${location}`;

    return (
        <html lang="ja">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href={canonicalUrl} />
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