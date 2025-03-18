"use client";
import React, { useState } from "react";

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
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", " "],
        [" ", "z", "x", "c", "v", "b", "n", "m", " ", " "]
    ];

    const handleKeyClick = (key: string) => {
        const uppercase = l2u[key] || "?";
        setResult(prev => prev + uppercase);
    };

    const handleBackspace = () => {
        setResult(prev => prev.slice(0, -1));
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
                    キーボードから入力した文字列を大文字化します。
                </p>
                <div>
                    <div className="inputs">
                        <div className="input-container" style={{"flex": "1"}}>
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
                                        key={key} 
                                        onClick={() => handleKeyClick(key)}
                                        disabled={Object.keys(l2u).includes(key) ? false : true}
                                        style={{"opacity": Object.keys(l2u).includes(key) ? 1 : 0}}
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
    );
}
