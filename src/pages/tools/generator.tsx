"use client";
import React, { useState } from "react";

import Metadata from "../../components/Metadata";

export default function GeneratorPage() {
    const [result, setResult] = useState("れのらり");

    const generate = () => {
        const S = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
        const N = 4;
        const text = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join("");
        setResult(text);

        const speech = document.getElementById("speech") as HTMLInputElement;
        if (speech.checked) {
            const audio = new Audio(`/api/speech/renorari?text=${text}`);
            audio.play().catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }
    };

    return (
        <>
            <Metadata title="れのらりジェネレーター" description="れのらりが名前を決める際に使用したプログラムを、一般公開したものです。" keywords={["れのらりジェネレーター", "名前ジェネレーター", "ランダムジェネレーター"]} image="https://new.renorari.net/images/tools/generator.png" />

            <main>
                <section id="description">
                    <h1>れのらりジェネレーターとは</h1>
                    <p>
                        れのらりジェネレーターとは、れのらりが名前を決める際に使用したプログラムを、一般公開したものです。
                        <br />
                        このプログラムでは、「れのらり」などのランダムな文字列を生成することができます。
                        <br />
                        「れのらり」以外の候補を生成しましょう!
                    </p>
                </section>
                <section id="play">
                    <h2>遊ぶ</h2>
                    下のボタンを押すと、ランダムな文字列が生成されます。
                    <br />
                    <div>
                        <input type="checkbox" name="speech" id="speech" />
                        <label htmlFor="speech">
                            音声読み上げを有効にする
                            <span className="details">
                                (Powered by KanaVoice)
                            </span>
                        </label>
                    </div>
                    <br />
                    <div style={{ "width": "100%", "textAlign": "center", "fontSize": "1.5em", "fontWeight": 600, "padding": "1em 0" }}>
                        {result}
                    </div>
                    <button onClick={generate}>生成</button>
                </section>
            </main>
        </>
    );
}
