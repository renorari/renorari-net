import React from "react";

import ContactList from "../components/ContactList";

export default function ContactPage() {
    return (
        <main>
            <h1>
                お問い合わせ
            </h1>
            <p>
                お問い合わせは以下の手段で受け付けています。
            </p>
            <ContactList />
        </main>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};