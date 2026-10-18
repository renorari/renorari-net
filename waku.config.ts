import { defineConfig } from "waku/config";

export default defineConfig({
    "vite": {
        "server": {
            "allowedHosts": ["b6f7-2001-f72-82e0-1700-75ea-55e5-9f9f-80dc.ngrok-free.app"]
        }
    }
});
