"use client";
import "../../styles/tools/aspect.css";

import React, { FC, useState } from "react";

// 計算用ヘルパー関数
const calculateRatio = (width: number, height: number): number => {
    const ratio = (1 - (1 / Math.max(width, height)) * Math.min(width, height)) * 100;
    return width > height ? -ratio : ratio;
};

const calculateDimensions = (ratio: number, size: number) => {
    const length = size - size * Math.abs(ratio) / 100;
    const width = ratio > 0 ? length : size;
    const height = ratio > 0 ? size : length;
    return { "width": Math.round(width), "height": Math.round(height) };
};

// 結果表示用コンポーネント
interface ResultDisplayProps {
    aspectRatio: string;
    result: string;
}

const ResultDisplay: FC<ResultDisplayProps> = ({ aspectRatio, result }) => {
    return (
        <div className="result-container" style={{ aspectRatio }}>
            {result}
        </div>
    );
};

export default function AspectPage() {
    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(9);
    const [ratio, setRatio] = useState(-43.75);
    const [size, setSize] = useState(1920);

    return (
        <main>
            <section id="description">
                <h2>AviUtl縦横比計算機</h2>
                <p>
                    AviUtl縦横比計算機は、AviUtlの縦横比を計算するためのツールです。
                </p>
            </section>

            <section id="aspect-calculator">
                <h2>幅から縦横比</h2>
                <p>
                    以下のフォームに、縦横幅を入力してください。
                    <br />
                    AviUtlは、小数点1桁までの縦横比をサポートしています。
                    <br />
                    そのため、AviUtl上では、多少の誤差が生じる可能性があります。
                </p>
                <label htmlFor="width">横幅</label>
                <input type="number" id="width" name="width" placeholder="16" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} required />
                <label htmlFor="height">縦幅</label>
                <input type="number" id="height" name="height" placeholder="9" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} required />

                {isNaN(calculateRatio(width, height)) ? <div className="result-container error">エラー</div> :
                    <ResultDisplay aspectRatio={`${width}/${height}`} result={calculateRatio(width, height).toFixed(2)} />
                }
            </section>

            <section id="size-calculator">
                <h2>縦横比から幅</h2>
                <p>
                    以下のフォームに、縦横比とサイズを入力してください。
                    <br />
                    AviUtlは、小数点1桁までの縦横比をサポートしています。
                    <br />
                    そのため、AviUtl上の値を入力すると、多少の誤差が生じる可能性があります。
                </p>
                <label htmlFor="ratio">縦横比</label>
                <input type="number" id="ratio" name="ratio" placeholder="-43.75" value={ratio} onChange={(e) => setRatio(parseFloat(e.target.value))} required />
                <label htmlFor="size">サイズ</label>
                <input type="number" id="size" name="size" placeholder="1920" value={size} onChange={(e) => setSize(parseInt(e.target.value))} required />

                {isNaN(calculateDimensions(ratio, size).width) ? <div className="result-container error">エラー</div> :
                    <ResultDisplay aspectRatio={`${calculateDimensions(ratio, size).width}/${calculateDimensions(ratio, size).height}`} result={calculateDimensions(ratio, size).width + " x " + calculateDimensions(ratio, size).height} />
                }
            </section>
        </main>
    );
}
