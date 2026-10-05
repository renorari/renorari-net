export type DonationFrequency = "once" | "monthly";

/** プリセット金額(円)。この範囲内であれば任意の金額も指定できる */
export const DONATION_AMOUNTS: Record<DonationFrequency, readonly number[]> = {
    "once": [500, 1000, 2000, 3000, 5000],
    "monthly": [300, 500, 1000, 2000, 3000]
};
export const MIN_DONATION = 100;
export const MAX_DONATION = 100000;

export function isValidDonation(amount: unknown): amount is number {
    return typeof amount === "number"
        && Number.isInteger(amount)
        && amount >= MIN_DONATION
        && amount <= MAX_DONATION;
}

/** Checkout セッションを作成し、Stripe の決済ページのURLを返す(ブラウザ側で使う) */
export async function createCheckoutUrl(amount: number, recurring: boolean): Promise<string> {
    const response = await fetch("/api/support/checkout", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify({ amount, recurring })
    });
    const data = await response.json();
    if (data.status !== "success" || !data.url) throw new Error(data.message);
    return data.url;
}
