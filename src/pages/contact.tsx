import React from "react";

import ContactList from "../components/ContactList";
import Metadata from "../components/Metadata";

export default function ContactPage() {
    return (
        <>
            <Metadata title="お問い合わせ" />

            <main>
                <h1>
                    お問い合わせ
                </h1>
                <p>
                    お問い合わせは以下の手段で受け付けています。
                </p>
                <ContactList />
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};