"use client";
import "./ShareButton.css";

import { ArrowUpFromSquare } from "@gravity-ui/icons";
import QRCode from "qrcode";
import React, { useEffect, useRef, useState } from "react";

export default function ShareButton({ title }: { title?: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [url, setUrl] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        const pageUrl = window.location.origin + window.location.pathname;
        setUrl(pageUrl);
        setCanShare(typeof navigator.share === "function" && (!navigator.canShare || navigator.canShare({ "url": pageUrl })));
        QRCode.toDataURL(pageUrl, { "errorCorrectionLevel": "M", "margin": 2, "scale": 8 })
            .then(setQrUrl)
            .catch(console.error);
    }, []);

    const share = async () => {
        try {
            await navigator.share({ "title": title ?? document.title, url });
        } catch (err) {
            // ユーザーによるキャンセルは無視
            if (!(err instanceof DOMException && err.name === "AbortError")) console.error(err);
        }
    };

    return (
        <>
            <button type="button" aria-label="共有" onClick={() => dialogRef.current?.showModal()}>
                <ArrowUpFromSquare className="icon" width="1em" height="1em" aria-hidden="true" />
            </button>

            <dialog
                ref={dialogRef}
                className="share-dialog"
                aria-label="共有"
                onClick={(e) => {
                    // 背景クリックで閉じる
                    if (e.target === e.currentTarget) e.currentTarget.close();
                }}
            >
                <div className="share-dialog-content">
                    {qrUrl && <img className="share-dialog-qr" src={qrUrl} alt={`QRコード: ${url}`} />}
                    <p className="share-dialog-url">{url}</p>
                    <div className="share-dialog-buttons">
                        {canShare && (
                            <button type="button" className="primary" onClick={share}>
                                <ArrowUpFromSquare className="icon" width="1em" height="1em" aria-hidden="true" />
                                他のアプリで共有
                            </button>
                        )}
                        <button type="button" onClick={() => dialogRef.current?.close()}>
                            閉じる
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
