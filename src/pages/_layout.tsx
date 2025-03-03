import "../styles/main.css";

import React, { ReactNode } from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <body>
            <NavBar />
            {children}
            <Footer />
        </body>
    );
}