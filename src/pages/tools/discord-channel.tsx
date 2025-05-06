"use client";
import React, { useState } from "react";

import Metadata from "../../components/Metadata";

export default function DiscordChannelPage() {
    const [result, setResult] = useState("");

    const l2u: { [key: string]: string } = {
        "a": "ꓮ",
        "b": "ꓐ",
        "c": "ꓚ",
        "d": "ꓓ",
        "e": "ꓰ",
        "f": "ꓝ",
        "g": "ꓖ",
        "h": "ꓧ",
        "i": "ꓲ",
        "j": "ꓙ",
        "k": "ꓗ",
        "l": "ꓡ",
        "m": "ꓟ",
        "n": "ꓠ",
        "o": "ꓳ",
        "p": "ꓑ",
        "q": "𝐐",
        "r": "ꓣ",
        "s": "ꓢ",
        "t": "ꓔ",
        "u": "ꓴ",
        "v": "ꓦ",
        "w": "ꓪ",
        "x": "ꓫ",
        "y": "ꓬ",
        "z": "ꓜ"
    };

    const keyboardLayout = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        [" ", "Z", "X", "C", "V", "B", "N", "M", " ", " "]
    ];

    const handleKeyClick = (key: string) => {
        const uppercase = l2u[key] || "?";
        setResult(prev => prev + uppercase);
    };

    const handleBackspace = () => {
        setResult(prev => prev.slice(0, -1));
    };

    return (
        <>
            <Metadata title="Discord Channel Namer" description="Discordのチャンネル名で大文字などの特殊文字を使用するためのツールです。" keywords={["Discord", "チャンネル名", "大文字", "特殊文字"]} image="https://new.renorari.net/images/tools/discord-channel.png" />

            <main>
                <section id="description">
                    <h1>Discord Channel Namerとは</h1>
                    <p>
                        Discord Channel Namerとは、Discordのチャンネル名で大文字などの特殊文字を使用するためのツールです。
                        <br />
                        このツールでは、大文字などの特殊文字を使用したチャンネル名を生成することができます。
                    </p>
                </section>
                <section id="uppercase">
                    <h2>大文字化</h2>
                    <p>
                        キーボードから入力した文字列を大文字化します。
                    </p>
                    <div>
                        <div className="inputs">
                            <div className="input-container" style={{ "flex": "1" }}>
                                <input type="text" value={result} readOnly />
                            </div>
                            <button onClick={() => navigator.clipboard.writeText(result)} style={{ "width": "unset" }}>
                                コピー
                            </button>
                            <button onClick={handleBackspace} style={{ "width": "unset" }}>
                                ⌫
                            </button>
                        </div>

                        <div className="virtual-keyboard">
                            {keyboardLayout.map((row, rowIndex) => (
                                <div key={rowIndex} className="buttons">
                                    {row.map((key) => (
                                        <button
                                            key={key.toLowerCase()}
                                            onClick={() => handleKeyClick(key.toLowerCase())}
                                            disabled={Object.keys(l2u).includes(key.toLowerCase()) ? false : true}
                                            style={{ "opacity": Object.keys(l2u).includes(key.toLowerCase()) ? 1 : 0 }}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
