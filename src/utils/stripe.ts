import Stripe from "stripe";

export function getStripe(): Stripe {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
        throw new Error("STRIPE_SECRET_KEY is not set");
    }
    return new Stripe(key);
}

let portalCache: { "url": string | null; "expires": number } | null = null;

/**
 * 継続支援の解約・変更に使う、Stripe Customer Portal のログインページURL。
 * 環境変数 BILLING_PORTAL_URL があればそれを使い、なければ有効なポータル設定から取得する(短時間キャッシュ)。
 * 見つからない場合は null(画面側はお問い合わせへの案内になる)。
 */
export async function getBillingPortalUrl(): Promise<string | null> {
    if (process.env.BILLING_PORTAL_URL) {
        return process.env.BILLING_PORTAL_URL;
    }
    if (!process.env.STRIPE_SECRET_KEY) {
        return null;
    }
    if (portalCache && portalCache.expires > Date.now()) {
        return portalCache.url;
    }

    let url: string | null = null;
    try {
        const configurations = await getStripe().billingPortal.configurations.list({ "active": true, "limit": 10 });
        const withLogin = configurations.data.filter((configuration) => configuration.login_page.enabled && configuration.login_page.url);
        const preferred = withLogin.find((configuration) => configuration.features.subscription_cancel.enabled) ?? withLogin[0];
        url = preferred?.login_page.url ?? null;
    } catch (error) {
        console.error(error);
    }
    // 取得できなかった場合は短めにキャッシュして、有効化したらすぐ反映されるようにする
    portalCache = { url, "expires": Date.now() + (url ? 10 * 60 * 1000 : 60 * 1000) };
    return url;
}
