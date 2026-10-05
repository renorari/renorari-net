"use client";

import "../styles/support.css";

import React, { useState } from "react";
import { Link } from "waku";

import { createCheckoutUrl } from "../utils/donation";
import Card from "./Card";
import CardList from "./CardList";
import { ArrowUpRightIcon, ChevronRightIcon, HeartIcon } from "./Icons";

const onceAmounts = [500, 1000, 3000];
const monthlyAmount = 500;

export default function QuickDonate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const donate = async (amount: number, recurring: boolean) => {
        setLoading(true);
        setError("");
        try {
            window.location.href = await createCheckoutUrl(amount, recurring);
        } catch (err) {
            console.error(err);
            setError("決済ページを開けませんでした。時間をおいて再度お試しください。");
            setLoading(false);
        }
    };

    return (
        <CardList className="one-column">
            <Card className="donate-theme donate-quick">
                <div className="donate-heading">
                    <div className="donate-icon">
                        <HeartIcon />
                    </div>
                    <div>
                        <h3>ワンタップで応援</h3>
                        <p className="quote">金額を選ぶと、Stripe の決済ページが開きます。</p>
                    </div>
                </div>
                <div className="buttons">
                    {onceAmounts.map((amount) => (
                        <button key={amount} type="button" className="short secondary" onClick={() => donate(amount, false)} disabled={loading}>
                            {amount.toLocaleString()}円
                            <ArrowUpRightIcon />
                        </button>
                    ))}
                    <button type="button" className="short" onClick={() => donate(monthlyAmount, true)} disabled={loading}>
                        <HeartIcon />
                        毎月{monthlyAmount.toLocaleString()}円
                        <ArrowUpRightIcon />
                    </button>
                </div>
                {error && <p className="donate-error" role="alert">{error}</p>}
                <p>
                    <Link to="/support">他の金額・くわしくはこちら <ChevronRightIcon /></Link>
                </p>
            </Card>
        </CardList>
    );
}
