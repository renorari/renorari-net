import "highlight.js/styles/github-dark.css";

import hljs from "highlight.js";
import parse from "html-react-parser";
import React from "react";

import { markdownToHtml } from "../utils/markdown";

interface ConvertTextProps {
    contentMD: string;
}

export default function Markdown({ contentMD }: ConvertTextProps) {
    const contentHTML = markdownToHtml(contentMD);

    const contentReact = parse(contentHTML, {
        "replace": (node) => {
            if (node.type === "tag" && "name" in node && node.name === "code" && 
                node.children && node.children.length > 0 && node.children[0]?.type === "text" && "data" in node.children[0]) {
                const hasPreParent = node.parent && "name" in node.parent && node.parent.name === "pre";
                
                if (hasPreParent) {
                    const language = node.attribs.class ? node.attribs.class.replace("language-", "") : "plaintext";
                    const result = hljs.highlight(node.children[0].data, {
                        "language": language
                    });
                    const dom = parse(result.value);

                    return (
                        <code className='hljs'>
                            {dom}
                        </code>
                    );
                }
            }
        }
    });

    return contentReact;
}
