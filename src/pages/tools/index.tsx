import React from "react";
import ToolsList from "../../components/ToolsList";

export default function ToolsListPage() {
    return (
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
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};