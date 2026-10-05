import React, { ReactNode } from "react";

import LandscapeAd from "../../components/LandscapeAd";
import QuickDonate from "../../components/QuickDonate";

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            {children}
            <div className="main-width">
                <QuickDonate />
            </div>
            <LandscapeAd />
        </>
    );
}