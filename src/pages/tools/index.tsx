import React from "react";
import ToolsList from "../../components/ToolsList";

export default function ToolsListPage() {
    return (
        <main>
            <h2>
                ウェブツール集
            </h2>
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