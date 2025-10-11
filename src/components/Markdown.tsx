"use client";

import "highlight.js/styles/github-dark.css";

import hljs from "highlight.js";
import React, { useEffect, useRef } from "react";

import { markdownToHtml } from "../utils/markdown";

interface ConvertTextProps {
    contentMD: string;
}

export default function Markdown({ contentMD }: ConvertTextProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentHTML = markdownToHtml(contentMD);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.querySelectorAll("pre code").forEach((element) => {
            hljs.highlightElement(element as HTMLElement);
        });
    }, [contentHTML]);

    return (
        <div
            ref={containerRef}
            className="markdown-body"
            dangerouslySetInnerHTML={{ "__html": contentHTML }}
        />
    );
}
