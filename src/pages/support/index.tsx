"use client";

import "../../styles/support.css";

import React, { useEffect, useState } from "react";
import { Link } from "waku";

import Card from "../../components/Card";
import { ArrowRightIcon, ArrowUpRightIcon, HeartIcon } from "../../components/Icons";
import Metadata from "../../components/Metadata";
import { createCheckoutUrl, DONATION_AMOUNTS, isValidDonation, MAX_DONATION, MIN_DONATION } from "../../utils/donation";

const CUSTOM = -1;

export default function SupportPage() {
    const [preset, setPreset] = useState(1000);
    const [custom, setCustom] = useState(1000);
    const [recurring, setRecurring] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [portalUrl, setPortalUrl] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/support/portal")
            .then((response) => response.json())
            .then((data) => setPortalUrl(data.url ?? null))
            .catch(() => setPortalUrl(null));
    }, []);

    const presets = DONATION_AMOUNTS[recurring ? "monthly" : "once"];
    const amount = preset === CUSTOM ? custom : preset;
    const valid = isValidDonation(amount);

    const changeFrequency = (next: boolean) => {
        setRecurring(next);
        // 1回と毎月でプリセットが違うため、選択が消えないようにする
        if (preset !== CUSTOM && !DONATION_AMOUNTS[next ? "monthly" : "once"].includes(preset)) {
            setPreset(DONATION_AMOUNTS[next ? "monthly" : "once"][2]);
        }
    };

    const donate = async () => {
        setError("");
        if (!valid) {
            setError(`金額は${MIN_DONATION.toLocaleString()}円以上${MAX_DONATION.toLocaleString()}円以下の整数で入力してください。`);
            return;
        }
        setLoading(true);
        try {
            window.location.href = await createCheckoutUrl(amount, recurring);
        } catch (err) {
            console.error(err);
            setError("決済ページを開けませんでした。時間をおいて再度お試しください。");
            setLoading(false);
        }
    };

    return (
        <>
            <Metadata title="募金のお願い" description="Renorari.net の運営費の募金・継続支援をお待ちしています。" />

            <main>
                <div className="donate-page">
                    <Card className="donate-theme">
                        <div className="donate-center">
                            <div className="donate-icon">
                                <HeartIcon />
                            </div>
                            <h1>募金のお願い</h1>
                            <p className="quote">
                                本サービスは無償で提供しています。サーバーやドメインの維持などの運営費に、ご協力いただける方からの募金・継続支援をお待ちしています。
                            </p>
                        </div>
                        <ul>
                            <li>募金・継続支援は任意です。金額も自由に決められます。</li>
                            <li>募金・継続支援の有無によって、サービスの利用条件に差を設けることはありません。</li>
                            <li>決済は Stripe の安全なフォームで行われます。カード情報は Stripe が取り扱い、当サイトには送信・保存されません。</li>
                        </ul>

                        <div className="donate-segment" role="group" aria-label="支援の方法">
                            <button type="button" aria-pressed={!recurring} onClick={() => changeFrequency(false)} disabled={loading}>
                                一度だけ
                            </button>
                            <button type="button" aria-pressed={recurring} onClick={() => changeFrequency(true)} disabled={loading}>
                                毎月
                            </button>
                        </div>
                        <p className="quote">
                            {recurring ? "毎月、同じ金額が自動でお支払いされます。解約や金額の変更は、いつでもご自身でできます。" : "1回だけのお支払いです。"}
                        </p>

                        <h3>募金額を選んでください</h3>
                        <div className="donate-amounts" role="radiogroup" aria-label="募金額">
                            {presets.map((value) => (
                                <label key={value}>
                                    <input type="radio" name="donate-amount" checked={preset === value} onChange={() => setPreset(value)} disabled={loading} />
                                    ¥{value.toLocaleString()}
                                    {recurring && <span className="details">&nbsp;/ 月</span>}
                                </label>
                            ))}
                            <label>
                                <input type="radio" name="donate-amount" checked={preset === CUSTOM} onChange={() => setPreset(CUSTOM)} disabled={loading} />
                                金額を指定する
                            </label>
                        </div>

                        {preset === CUSTOM && (
                            <div className="input-container">
                                <label htmlFor="donate-custom">募金額(円)</label>
                                <input
                                    id="donate-custom"
                                    type="number"
                                    min={MIN_DONATION}
                                    max={MAX_DONATION}
                                    step={1}
                                    inputMode="numeric"
                                    value={Number.isNaN(custom) ? "" : custom}
                                    onChange={(event) => setCustom(event.target.valueAsNumber)}
                                    disabled={loading}
                                />
                                <p className="details">
                                    {MIN_DONATION.toLocaleString()}円以上、{MAX_DONATION.toLocaleString()}円以下の整数で入力してください。
                                </p>
                            </div>
                        )}

                        {error && <p className="donate-error" role="alert">{error}</p>}

                        <button type="button" className={loading ? "loading" : ""} onClick={donate} disabled={loading || !valid}>
                            {valid ? `${recurring ? "毎月" : ""}${amount.toLocaleString()}円を募金する` : "金額を選んでください"}
                            <ArrowRightIcon />
                        </button>
                    </Card>

                    <section className="donate-theme donate-center">
                        <h3>継続支援を解約・変更したい方へ</h3>
                        {portalUrl ? (
                            <>
                                <p className="quote">
                                    購入時のメールアドレスを入力すると、Stripe から本人確認のメールが届き、そこから解約や金額の変更ができます。
                                </p>
                                <a className="button short secondary" href={portalUrl} target="_blank" rel="noopener noreferrer">
                                    継続支援を解約・変更する
                                    <ArrowUpRightIcon />
                                </a>
                            </>
                        ) : (
                            <>
                                <p className="quote">
                                    継続支援の解約・変更は、購入時のメールアドレスを添えて、お問い合わせページからご連絡ください。
                                </p>
                                <Link className="button short secondary" to="/contact">
                                    お問い合わせページへ
                                </Link>
                            </>
                        )}
                        <p>
                            <Link to="/legal/disclaimer#donation">お支払い・解約・返金について</Link>
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}
