import React from "react";

import Metadata from "../../components/Metadata";
import ToolsList from "../../components/ToolsList";

export default function ToolsListPage() {
    return (
        <>
            <Metadata title="ウェブツール集" description="れのらりが作成したウェブツール集です。" keywords={["ウェブツール", "ツール集"]} />

            <main>
                <h1>
                    ウェブツール集
                </h1>
                <p>
                    れのらりが作成したウェブツール集です。
                    <br />
                    ぜひ、ご活用ください。
                </p>
                <ToolsList />
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};