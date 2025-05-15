import { defineConfig } from "waku/config";

export default defineConfig({
    "middleware": [
        "./src/middleware/redirect",
        // waku default middleware
        "waku/middleware/context",
        "waku/middleware/dev-server",
        "waku/middleware/handler"
    ]

});
