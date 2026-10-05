import { isValidDonation } from "../../../utils/donation";
import { getStripe } from "../../../utils/stripe";

export const POST = async (request: Request): Promise<Response> => {
    if (!process.env.STRIPE_SECRET_KEY) {
        return Response.json({
            "status": "error",
            "message": "Stripe is not configured"
        }, { "status": 500 });
    }

    try {
        const body = await request.json().catch(() => null) as { amount?: unknown, recurring?: unknown } | null;
        const amount = body?.amount;
        const monthly = body?.recurring === true;
        if (!isValidDonation(amount)) {
            return Response.json({
                "status": "error",
                "message": "Invalid amount"
            }, { "status": 400 });
        }

        const baseUrl = process.env.SITE_URL || "https://" + new URL(request.url).host;
        const metadata = { "purpose": "donation" };
        const session = await getStripe().checkout.sessions.create({
            "mode": monthly ? "subscription" : "payment",
            metadata,
            // 「寄付」ボタン表記は1回払いのみ対応
            ...(monthly ? { "subscription_data": { metadata } } : { "submit_type": "donate" as const }),
            "locale": "ja",
            "line_items": [{
                "quantity": 1,
                "price_data": {
                    "currency": "jpy",
                    // JPYは最小単位がないため、金額をそのまま渡す
                    "unit_amount": amount,
                    ...(monthly ? { "recurring": { "interval": "month" as const } } : {}),
                    "product_data": {
                        "name": monthly ? "Renorari.net への継続支援(毎月)" : "Renorari.net への募金"
                    }
                }
            }],
            "success_url": `${baseUrl}/support/thanks`,
            "cancel_url": `${baseUrl}/support`
        });

        return Response.json({
            "status": "success",
            "url": session.url
        });
    } catch (error) {
        console.error(error);
        return Response.json({
            "status": "error",
            "message": "Failed to create checkout session"
        }, { "status": 500 });
    }
};
