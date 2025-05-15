import type { Middleware } from "waku/config";

const redirectMap: Record<string, string> = {
    "/downloads/goluboi-bagon": "/downloads/goluboi-vagon",
    "/downloads/goluboi-bagon.html": "/downloads/goluboi-vagon",
    "/downloads/sakkijarven-polkka-ust.html": "/downloads/sakkijarven-polkka-ust",
    "/downloads/sakkijarven-polkka-video.html": "/downloads/sakkijarven-polkka-video",
    "/licenses/ust/1.html": "/licenses/ust/1",
    "/licenses/video/1.html": "/licenses/video/1",
    "/tools/aspect.html": "/tools/aspect",
    "/tools/beep.html": "/tools/beep",
    "/tools/block-checker.html": "/tools/block-checker",
    "/tools/discord-channel.html": "/tools/discord-channel",
    "/tools/generator.html": "/tools/generator",
    "/tools/grade.html": "/tools/grade",
    "/tools/qr.html": "/tools/qr",
    "/tools/thumbnail-maker.html": "/tools/thumbnail-maker",
    "/about.html": "/about",
    "/contact.html": "/contact",
    "/disclaimer.html": "/legal/disclaimer",
    "/privacy.html": "/legal/privacy",
    "/blog/【HTS】窓による音声の違い/": "/blog/23",
    "/blog/【メモ】node-jsでxmlをjsonにする/": "/blog/24",
    "/blog/【簡単】androidでlinuxアプリを動かしてみよう！/": "/blog/29",
    "/blog/【簡単】aviutlだけでキレイなコラ画像/": "/blog/30",
    "/blog/【強制キャンセル】XREAL公式ショップでキャンセルされた話/": "/blog/28",
    "/blog/【強制キャンセル】XREAL公式ショップでキャンセルされた話/2.md": "/blog/25",
    "/blog/【強制キャンセル】XREAL公式ショップでキャンセルされた話/3.md": "/blog/26",
    "/blog/【強制キャンセル】XREAL公式ショップでキャンセルされた話/4.md": "/blog/27",
    "/blog/2020年から2021年にかけてDiscord上で発生した一連の闘争等について/": "/blog/1",
    "/blog/beepの使い方/": "/blog/4",
    "/blog/copilotを使った所感/": "/blog/5",
    "/blog/discordjsの断続的な音声を穴埋めする/": "/blog/6",
    "/blog/edgeで崩れる100vw/": "/blog/7",
    "/blog/electronインストールできない-調べてもだめ/": "/blog/8",
    "/blog/free-font-1/": "/blog/9",
    "/blog/GeminiがPixelにも来た/": "/blog/2",
    "/blog/htsvoice作るメモ1/": "/blog/10",
    "/blog/ipadで変わる説明の話/": "/blog/11",
    "/blog/kana-voice-tool-新バージョン公開/": "/blog/12",
    "/blog/kana-voice-toolの使い方/": "/blog/13",
    "/blog/macbookandroid-奇怪な持ち合わせで困ったこと/": "/blog/14",
    "/blog/minecraft軽量化-modrinth/": "/blog/15",
    "/blog/MySQLでユーザー作成からテーブル作成まで/": "/blog/3",
    "/blog/parallels-desktopでwindows11の日本語入力をmacに合わせる方法/": "/blog/16",
    "/blog/qrmakerの使い方/": "/blog/17",
    "/blog/renorari-generatorの使い方/": "/blog/18",
    "/blog/skitch終了/": "/blog/19",
    "/blog/windowsでnode-gypが成功した話/": "/blog/20",
    "/blog/xreal-電車/": "/blog/21",
    "/blog/xrealでもminecraftを遊びたい/": "/blog/22",
    "/blog/ターミナルで花火を見よう/": "/blog/33",
    "/blog/デスクトップ版discordのIDをコピーする方法/": "/blog/34",
    "/blog/パーティションテーブルを消す方法/": "/blog/35",
    "/blog/モバイル版discordのIDをコピーする方法/": "/blog/36",
    "/blog/れのらりblogを移行した話/": "/blog/32",
    "/blog/私がサクッと認証付きで-node-js-からメールを送った話/": "/blog/38",
    "/blog/自己自動更新のためのメモ/": "/blog/39",
    "/blog/誰でもできる！discordのbotアカウント作成/": "/blog/40",
    "/blog/未来のiPhone%2030：デジタルの新時代への扉/": "/blog/37"
};

const redirectsMiddleware: Middleware = () => {
    return async (ctx, next) => {
        const url = ctx.req.url.pathname;
        if (url in redirectMap) {
            const newUrl = redirectMap[url] || "";
            ctx.res.status = 308;
            ctx.res.headers = {
                ...ctx.res.headers,
                "Location": newUrl
            };
        } else {
            return await next();
        }
    };
};

export default redirectsMiddleware;
