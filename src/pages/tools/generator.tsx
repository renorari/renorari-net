"use client";
import React, { useState } from "react";

export default function GeneratorPage() {
    const [result, setResult] = useState("れのらり");

    const generate = () => {
        const S = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
        const N = 4;
        const text = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join("");
        setResult(text);
    };

    return (
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
                <div style={{ "width": "100%", "textAlign": "center", "fontSize": "1.5em", "fontWeight": 600, "padding": "1em 0" }}>
                    {result}
                </div>
                <button onClick={generate}>生成</button>
            </section>
        </main>
    );
}
