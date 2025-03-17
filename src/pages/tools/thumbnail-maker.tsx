"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ThumbnailMakerPage() {
    const [title, setTitle] = useState("タイトル");
    const [subtitle, setSubtitle] = useState("サブタイトル");
    const [titleColor, setTitleColor] = useState("#333333");
    const [subtitleColor, setSubtitleColor] = useState("#666666");
    const [backgroundColor, setBackgroundColor] = useState("#e3bef4");
    const [backgroundColor2, setBackgroundColor2] = useState("#ffffff");
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
    // ローカルストレージからデータを読み込む
        const savedData = localStorage.getItem("thumbnail-1");
        if (savedData) {
            const data = JSON.parse(savedData);
            setTitle(data.title);
            setSubtitle(data.subtitle);
            setTitleColor(data.titleColor);
            setSubtitleColor(data.subtitleColor);
            setBackgroundColor(data.backgroundColor);
            setBackgroundColor2(data.backgroundColor2);
        }
    }, []);

    useEffect(() => {
        generateThumbnail();
        // 保存処理
        const data = {
            title,
            subtitle,
            titleColor,
            subtitleColor,
            backgroundColor,
            backgroundColor2
        };
        localStorage.setItem("thumbnail-1", JSON.stringify(data));
    }, [title, subtitle, titleColor, subtitleColor, backgroundColor, backgroundColor2]);

    const generateThumbnail = async () => {
        if (!canvasRef.current) return;
    
        try {
            // フォントの読み込みを確認
            const font = new FontFace("Corporate-Logo-Medium", "url('/fonts/corporate-logo-medium.woff2') format('woff2'), url('/fonts/corporate-logo-medium.woff') format('woff')", {
                "weight": "400",
                "style": "normal"
            });
            await font.load();
            document.fonts.add(font);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // 背景を描画
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = backgroundColor2;
            ctx.fillRect(96, 96, canvas.width - 192, canvas.height - 192);
      
            // サブタイトルを描画
            ctx.fillStyle = subtitleColor;
            ctx.font = "400 48px 'Corporate-Logo-Medium'";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 - 96);
      
            // タイトルを描画
            ctx.fillStyle = titleColor;
            ctx.font = "400 72px 'Corporate-Logo-Medium'";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(title, canvas.width / 2, canvas.height / 2);
        } catch (error) {
            console.error("サムネイル生成中にエラーが発生しました:", error);
        }
    };

    const download = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "thumbnail.png";
        link.click();
    };

    const reset = () => {
        if (!confirm("リセットしますか?")) {
            return;
        }
        localStorage.removeItem("thumbnail-1");
        setTitle("タイトル");
        setSubtitle("サブタイトル");
        setTitleColor("#333333");
        setSubtitleColor("#666666");
        setBackgroundColor("#e3bef4");
        setBackgroundColor2("#ffffff");
    };

    return (
        <main>
            <section>
                <h2>Thumbnail Maker</h2>
                <p>
                    このページでは、サムネイルを生成することができます。
                    <br />
                    生成したサムネイルは、PNG形式でダウンロードすることができます。
                </p>
            </section>
            <section>
                <h2>Type - 1</h2>
                <p>
                    原作サムネイル: <a href="https://psychiatry-hospitalization.hateblo.jp/">精神科病棟に入院した高校生の日記。</a>
                </p>
                <div>
                    <canvas ref={canvasRef} width="1920" height="1080">
                        thumbnail
                    </canvas>
                    <div className="input-container">
                        <label htmlFor="title">タイトル</label>
                        <div className="inputs">
                            <input 
                                type="text" 
                                id="title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                            <input 
                                type="color" 
                                id="title-color" 
                                value={titleColor} 
                                onChange={(e) => setTitleColor(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="subtitle">サブタイトル</label>
                        <div className="inputs">
                            <input 
                                type="text" 
                                id="subtitle" 
                                value={subtitle} 
                                onChange={(e) => setSubtitle(e.target.value)} 
                            />
                            <input 
                                type="color" 
                                id="subtitle-color" 
                                value={subtitleColor} 
                                onChange={(e) => setSubtitleColor(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="background-color">背景色1</label>
                        <input 
                            type="color" 
                            id="background-color" 
                            value={backgroundColor} 
                            onChange={(e) => setBackgroundColor(e.target.value)} 
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="background-color-2">背景色2</label>
                        <input 
                            type="color" 
                            id="background-color-2" 
                            value={backgroundColor2} 
                            onChange={(e) => setBackgroundColor2(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={download}>ダウンロード</button>
                    <button onClick={reset} className="secondary">リセット</button>
                </div>
            </section>
        </main>
    );
}
