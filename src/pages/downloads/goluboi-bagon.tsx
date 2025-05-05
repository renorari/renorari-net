import { unstable_redirect } from "waku/router/server";

export default function redirect() {
    unstable_redirect("./goluboi-vagon", 308);
}