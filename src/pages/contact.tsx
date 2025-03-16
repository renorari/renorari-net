import React from "react";

export default function ContactPage() {
    return (
        <main>
            <h2>
                お問い合わせ
            </h2>
            <p>
                お問い合わせは以下の手段で受け付けています。
            </p>
            <table>
                <thead>
                    <tr>
                        <th>サービス</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>✉️Email</td>
                        <td>
                            <a href="mailto:renorari@renorari.net">
                                renorari@renorari.net
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>🦋BlueSky</td>
                        <td>
                            <a href="https://bsky.app/profile/renorari.net">
                                @renorari.net
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>😎Discord</td>
                        <td>
                            <a href="https://discord.com/users/698395012219666432">
                                renorari
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>🐈‍⬛GitHub</td>
                        <td>
                            <a href="https://github.com/renorari">
                                Renorari
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>👽Reddit</td>
                        <td>
                            <a href="https://www.reddit.com/user/Renorari">
                                u/Renorari
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>🕊️X</td>
                        <td>
                            <a href="https://x.com/renorari">
                                Renorari
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>📺YouTube</td>
                        <td>
                            <a href="https://www.youtube.com/@mozbek-dayo">
                                @mozbek-dayo
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Ⓜ️さいばれすきー(Misskey)</td>
                        <td>
                            <a href="https://mi.cbrx.io/@renorari">
                                @renorari@mi.cbrx.io
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}