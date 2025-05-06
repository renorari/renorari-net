"use client";
import "../../styles/tools/qr.css";

import QRCode, {
    QRCodeErrorCorrectionLevel, QRCodeMaskPattern, QRCodeRenderersOptions
} from "qrcode";
import React, { useEffect, useRef, useState } from "react";

import Metadata from "../../components/Metadata";

// QRコードのバージョン: 1 - 40
type QRCodeVersion = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;

function date2str(x: Date): string {
    const y = x.getFullYear();
    const m = ("00" + (x.getMonth() + 1)).slice(-2);
    const d = ("00" + x.getDate()).slice(-2);
    const h = ("00" + x.getHours()).slice(-2);
    const i = ("00" + x.getMinutes()).slice(-2);
    const s = ("00" + x.getSeconds()).slice(-2);
    return y + m + d + h + i + s;
}

export default function QRPage() {
    const [text, setText] = useState("https://renorari.net");
    const [qrUrl, setQrUrl] = useState("");
    const [colorDark, setColorDark] = useState("#000000");
    const [colorLight, setColorLight] = useState("#ffffff");
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRCodeErrorCorrectionLevel>("L");
    const [maskPattern, setMaskPattern] = useState<QRCodeMaskPattern>(0);
    const [margin, setMargin] = useState(4);
    const [scale, setScale] = useState(16);
    const [version, setVersion] = useState<QRCodeVersion | undefined>(undefined);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const checkClipboard = async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.readText) {
                    const clipboardText = await navigator.clipboard.readText();
                    if (clipboardText && clipboardText.trim() !== "") {
                        setText(clipboardText);
                    }
                }
            } catch (err) {
                console.warn(err);
            }
        };

        checkClipboard();
    }, []);

    useEffect(() => {
        if (text) {
            const options: QRCodeRenderersOptions = {
                "color": {
                    "dark": colorDark,
                    "light": colorLight
                },
                "errorCorrectionLevel": errorCorrectionLevel,
                "maskPattern": maskPattern,
                "margin": margin,
                "scale": scale,
                "version": version
            };

            // canvas要素にQRコードを描画
            if (canvasRef.current) {
                QRCode.toCanvas(canvasRef.current, text, options, (error) => {
                    if (error) console.error(error);
                });
            }

            // QRコードのURLを生成（ダウンロード用）
            QRCode.toDataURL(text, options, (err, url) => {
                if (err) console.error(err);
                setQrUrl(url);
            });
        }
    }, [text, colorDark, colorLight, errorCorrectionLevel, maskPattern, margin, scale, version]);

    const handleDownload = () => {
        if (qrUrl) {
            const link = document.createElement("a");
            link.download = `QR_${date2str(new Date())}.png`;
            link.href = qrUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <>
            <Metadata title="QRコードメーカー" description="QRコードを生成するツールです。" keywords={["QRコード", "QR Code", "QR Code Maker"]} image="https://new.renorari.net/images/tools/qr.png" /><main>
                <section id="description">
                    <h1>QR Code Maker</h1>
                    <p>
                        このページでは、QRコードを生成することができます。
                        <br />
                        テキストを入力し、QRコードを生成してみましょう。
                    </p>

                    <p>
                        <input type="checkbox" className="accordion-toggle" id="accordion-toggle" name="accordion-toggle" />
                        <label htmlFor="accordion-toggle" className="accordion-title">各設定の説明をみる</label>

                        <br />

                        <table className="accordion">
                            <thead>
                                <tr>
                                    <th>設定</th>
                                    <th>初期値</th>
                                    <th className="w-50">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>テキスト</td>
                                    <td>https://renorari.net</td>
                                    <td>
                                        QRコードに変換するテキストを入力します。
                                        <br />
                                        URLを入力すると、そのURLにリンクするQRコードが生成されます。
                                    </td>
                                </tr>
                                <tr>
                                    <td>明色</td>
                                    <td>#ffffff</td>
                                    <td>
                                        QRコードの背景色を指定します。
                                        <br />
                                        できる限り明るい色を指定してください。
                                    </td>
                                </tr>
                                <tr>
                                    <td>暗色</td>
                                    <td>#000000</td>
                                    <td>
                                        QRコードの色を指定します。
                                        <br />
                                        できる限り暗い色を指定してください。
                                    </td>
                                </tr>
                                <tr>
                                    <td>誤り訂正レベル</td>
                                    <td>L</td>
                                    <td>
                                        QRコードの誤り訂正レベルを指定します。
                                        <br />
                                        誤り訂正レベルが高いほど、QRコードの耐障害性が向上しますが、サイズが大きくなります。
                                    </td>
                                </tr>
                                <tr>
                                    <td>マスクパターン</td>
                                    <td>0</td>
                                    <td>
                                        QRコードのマスクパターンを指定します。
                                    </td>
                                </tr>
                                <tr>
                                    <td>余白</td>
                                    <td>4</td>
                                    <td>
                                        QRコードの余白を指定します。
                                        <br />
                                        0を指定できますが、読み取りが困難になる可能性があります。
                                        <br />
                                        必ず余白を設定してください。
                                    </td>
                                </tr>
                                <tr>
                                    <td>拡大率</td>
                                    <td>16</td>
                                    <td>
                                        QRコードの拡大率を指定します。
                                        <br />
                                        1ドットあたりのピクセル数を指定します。
                                    </td>
                                </tr>
                                <tr>
                                    <td>バージョン</td>
                                    <td>自動</td>
                                    <td>QRコードのバージョンを指定します。</td>
                                </tr>
                            </tbody>
                        </table>

                        QRコードについての詳しい説明は、
                        <a href="https://www.qrcode.com/about/index.html" target="_blank" rel="noopener noreferrer">QRコード ドットコム</a>
                        をご覧ください。
                    </p>
                </section>

                <section id="generator">
                    <h2>QRコードを生成する</h2>

                    <div id="result" style={{ "textAlign": "center", "width": "100%" }}>
                        <div style={{ "maxWidth": "100%", "overflow": "hidden" }}>
                            <canvas ref={canvasRef} className="qr" />
                        </div>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="input-container">
                            <label htmlFor="qr-text">テキスト</label>
                            <input
                                type="text"
                                id="qr-text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="URLまたはテキストを入力"
                                className="form-control" />
                        </div>
                        <div className="inputs">
                            <div className="input-container">
                                <label htmlFor="qr-color-light">明色(背景)</label>
                                <input
                                    type="color"
                                    id="qr-color-light"
                                    value={colorLight}
                                    onChange={(e) => setColorLight(e.target.value)}
                                    className="form-control" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="qr-color-dark">暗色(コード)</label>
                                <input
                                    type="color"
                                    id="qr-color-dark"
                                    value={colorDark}
                                    onChange={(e) => setColorDark(e.target.value)}
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="input-container">
                            <label htmlFor="qr-error-correction-level">誤り訂正レベル</label>
                            <select
                                id="qr-error-correction-level"
                                value={errorCorrectionLevel}
                                onChange={(e) => setErrorCorrectionLevel(e.target.value as QRCodeErrorCorrectionLevel)}
                                className="form-control"
                            >
                                <option value="L">Low (7%)</option>
                                <option value="M">Medium (15%)</option>
                                <option value="Q">Quartile (25%)</option>
                                <option value="H">High (30%)</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label htmlFor="qr-mask-pattern">マスクパターン</label>
                            <select
                                id="qr-mask-pattern"
                                value={maskPattern}
                                onChange={(e) => setMaskPattern(parseInt(e.target.value) as QRCodeMaskPattern)}
                                className="form-control"
                            >
                                {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container">
                            <label htmlFor="qr-margin">余白</label>
                            <input
                                type="number"
                                id="qr-margin"
                                value={margin}
                                min={0}
                                onChange={(e) => setMargin(parseInt(e.target.value))}
                                className="form-control" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="qr-scale">拡大率</label>
                            <input
                                type="number"
                                id="qr-scale"
                                value={scale}
                                min={1}
                                onChange={(e) => setScale(parseInt(e.target.value))}
                                className="form-control" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="qr-version">バージョン (1~40)</label>
                            <input
                                type="number"
                                id="qr-version"
                                placeholder="(最小)"
                                min={1}
                                max={40}
                                value={version}
                                onChange={(e) => setVersion(parseInt(e.target.value) as QRCodeVersion)}
                                className="form-control" />
                        </div>
                    </form>
                    <button onClick={handleDownload} className="download-button" style={{ "marginTop": "2rem" }}>
                        QRコードをダウンロード
                    </button>
                </section>
            </main>
        </>
    );
}
