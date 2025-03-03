import "../styles/main.css";

import React, { ReactNode } from "react";

import NavBar from "../components/NavBar";

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <body>
            <NavBar />
            {children}
        </body>
    );
}