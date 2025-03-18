"use client";
import React, { useState } from "react";

export default function DiscordChannelPage() {
    const [result, setResult] = useState("");
    const [input, setInput] = useState("");

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

    const uppercase = () => {
        const uppercase = Array.from(input).map((c) => l2u[c] || c).join("");
        setResult(uppercase);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value.toLowerCase());
    };

    return (
        <main>
            <section id="description">
                <h2>Discord Channel Namerとは</h2>
                <p>
                    Discord Channel Namerとは、Discordのチャンネル名で大文字などの特殊文字を使用するためのツールです。
                    <br />
                    このツールでは、大文字などの特殊文字を使用したチャンネル名を生成することができます。
                </p>
            </section>
            <section id="uppercase">
                <h2>大文字化</h2>
                <p>
                    下の入力欄に小文字を入れると、Discordチャンネル用の大文字化された文字列が生成されます。
                </p>
                <div>
                    <div style={{ "fontSize": "2em", "textAlign": "center" }}>
                        {result}
                    </div>
                    <input 
                        type="text" 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="小文字を入力" 
                    />
                    <button onClick={uppercase}>大文字化</button>
                </div>
            </section>
        </main>
    );
}
