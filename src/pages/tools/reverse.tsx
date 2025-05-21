"use client";
import React, { useState } from "react";
import Metadata from "../../components/Metadata";

export default function ReverseTextPage() {
    const [inputText, setInputText] = useState("");
    const reversed = inputText.split("").reverse().join("");

    return (
        <>
            <Metadata title="テキスト反転ツール" description="入力したテキストを反転させるためのシンプルなツールです。" keywords={["テキスト反転", "文字列反転", "文字列逆順"]} image="https://renorari.net/images/tools/reverse.png" />

            <main>
                <section id="description">
                    <h1>テキスト反転ツール</h1>
                    <p>
                        テキスト反転ツールは、入力したテキストを反転させるためのシンプルなツールです。
                        <br />
                        文字列を逆に表示することで、さまざまな用途に利用できます。
                    </p>
                </section>
                <section id="run">
                    <h2>反転</h2>
                    <div className="input-container">
                        <div className="inputs">
                            <input
                                type="text"
                                id="input-text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="反転させたいテキストを入力してください" />
                            <input type="text" id="output-text" value={reversed} placeholder="反転されたテキスト" readOnly />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}