import React from "react";

interface MetadataProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    noindex?: boolean;
}

export default function Metadata({ title, description, keywords, image, noindex }: MetadataProps) {
    const viewTitle = title ? title + " - Renorari.net" : "Renorari.net";
    const viewDescription = description || "れのらりが運営しているサービスや、ソフトウェアについて紹介しています。";
    const viewKeywords = keywords ? keywords.join(", ") : "れのらり, renorari, renorari.net, renorarinet";
    const viewImage = image?.startsWith("/") ? "https://renorari.net" + image : image || "https://renorari.net/images/ogp.png";

    return (
        <>
            <title>{viewTitle}</title>
            <meta name="description" content={viewDescription} />
            <meta name="keywords" content={viewKeywords} />
            <meta name="author" content="renorari" />
            <link rel="icon" type="image/png" href="/images/favicon.png" />
            {noindex && <meta name="robots" content="noindex" />}

            <meta property="og:title" content={viewTitle} />
            <meta property="og:locale" content="ja_JP" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://renorari.net/" />
            <meta property="og:image" content={viewImage} />
            <meta property="og:site_name" content="Renorari.net" />
            <meta property="og:description" content={viewDescription} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@renorari" />
        </>
        
    );
}
