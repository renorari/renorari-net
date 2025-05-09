import React, { ReactNode } from "react";

import LandscapeAd from "../../components/LandscapeAd";

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            {children}
            <LandscapeAd />
        </>
    );
}