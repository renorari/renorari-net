"use client";
import "../../styles/tools/block.css";

import React, { FormEvent, useEffect, useState } from "react";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Metadata from "../../components/Metadata";
import Nothing from "../../components/Nothing";
import checkBlock from "../../utils/checkBlock";

export default function BlockCheckerPage() {
    const [id, setId] = useState("");
    const [result, setResult] = useState<{ kana: boolean, kanaIsRemovable: boolean, ugc: boolean, takasumi: boolean } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        const res = await checkBlock(id).catch(() => null);
        setResult(res);
        setLoading(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const idParam = params.get("id");
            if (idParam && /^\d{17,20}$/.test(idParam)) {
                setId(idParam);
            }
        }
    }, []);

    return (
        <>
            <Metadata title="Block Checker" description="Kana/UGC/TakasumiBOTのブロックを確認するためのツールです。" keywords={["Block Checker", "Kana", "UGC", "TakasumiBOT"]} image="https://renorari.net/images/tools/block-checker.png" />

            <main>
                <section id="description">
                    <h1>Block Checker</h1>
                    <p>
                        ブロックチェッカーは、Kana/UGC/TakasumiBOTのブロックを確認するためのツールです。
                        <br />
                        このツールでブロックされているかどうかを確認できます。
                    </p>
                </section>

                <section id="block-checker">
                    <h2>チェック</h2>
                    <p>
                        以下のフォームに、ユーザーIDまたはサーバーIDを入力してください。
                        <br />
                        IDの取得方法は、下の記事をご参考ください。
                        <br />
                        <a href="/blog/%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97%E7%89%88discord%E3%81%AEID%E3%82%92%E3%82%B3%E3%83%94%E3%83%BC%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/"
                            target="_blank">デスクトップ版DiscordでIDをコピーする方法</a>
                        <br />
                        <a href="/blog/%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E7%89%88discord%E3%81%AEID%E3%82%92%E3%82%B3%E3%83%94%E3%83%BC%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/"
                            target="_blank">モバイル版DiscordでIDをコピーする方法</a>
                        <br />
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            placeholder="000000000000000000"
                            required
                            pattern="\d{17,20}"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={loading ? "loading" : ""}
                            disabled={loading}
                        >
                            {!loading ? "チェック" : "チェック中..."}
                        </button>
                    </form>
                    {result ? (
                        <CardList>
                            <Card className={result.kana ? "blocked" : "unblocked"} title="Kana / VoiceJP">
                                {result.kana ? "ブロックされています" : "ブロックされていません"}
                                {result.kana && (<>
                                    <br />
                                    ブロック解除の可能性: {result.kanaIsRemovable ? "可能" : "不可能な場合あり"}
                                </>)}
                            </Card>
                            <Card className={result.ugc ? "blocked" : "unblocked"} title="UGC">
                                {result.ugc ? "ブロックされています" : "ブロックされていません"}
                            </Card>
                            <Card className={result.takasumi ? "blocked" : "unblocked"} title="TakasumiBOT">
                                {result.takasumi ? "ブロックされています" : "ブロックされていません"}
                            </Card>
                        </CardList>
                    ) : (
                        <Card>
                            <Nothing>
                                チェック結果がここに表示されます
                            </Nothing>
                        </Card>
                    )}
                </section>

                <section id="notice">
                    <h2>ご注意</h2>
                    <p>
                        このツールは、Kana/UGC/TakasumiBOTのブロックを確認するためのツールですが、情報が正確であることを保証するものではありません。
                        <br />
                        また、このツールはTakasumiBOTとは関係がありませんので、TakasumiBOTに関するお問い合わせはご遠慮ください。
                        <br />
                        なお、KanaとUGCのブロック解除については、<a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfRNGNRJ7jvYyIZP7ZGgZESlikJQM5HI4PXGe5Dv5icOMWPww/viewform?usp=sf_link">Kana/UGC
                            ブロックリスト異議申し立て</a>にて解除を申請することができます。
                    </p>
                </section>
            </main>
        </>
    );
}
