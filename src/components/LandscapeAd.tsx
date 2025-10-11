"use client";
import React, { useEffect, useState } from "react";

import { Adsense } from "@ctrl/react-adsense";

export default function LandscapeAd() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <Adsense
            client="ca-pub-1265980632516511"
            slot="5007805121"
            className="ad"
            format="auto"
            responsive="true"
        />
    );
}
