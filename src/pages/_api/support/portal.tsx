import { getBillingPortalUrl } from "../../../utils/stripe";

export const GET = async (): Promise<Response> => {
    return Response.json({
        "url": await getBillingPortalUrl()
    });
};
