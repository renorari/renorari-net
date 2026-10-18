function escapeVCardText(value: string) {
    return value.replace(/([\\;,])/g, "\\$1").replace(/\r?\n/g, "\\n");
}

function foldVCardLine(line: string) {
    const foldedLines: string[] = [];
    let currentLine = "";
    let currentBytes = 0;

    for (const character of line) {
        const characterBytes = new TextEncoder().encode(character).length;
        if (currentBytes + characterBytes > 75 && currentLine) {
            foldedLines.push(currentLine);
            currentLine = ` ${character}`;
            currentBytes = characterBytes + 1;
        } else {
            currentLine += character;
            currentBytes += characterBytes;
        }
    }

    if (currentLine) {
        foldedLines.push(currentLine);
    }

    return foldedLines;
}

const socialProfiles = [
    ["BeReal", "https://bere.al/renorari"],
    ["Bluesky", "https://bsky.app/profile/renorari.net"],
    ["Discord", "https://discord.com/users/698395012219666432"],
    ["Facebook", "https://facebook.com/renorari.san"],
    ["Instagram", "https://instagram.com/renorari.san"],
    ["Jiffcy", "https://api.jiffcy.com/shares/gykwhld"],
    ["KakaoTalk", "http://qr.kakao.com/talk/A3q8FUXaiSBv5qwT4LbMigxTgSk-"],
    ["LINE", "https://line.me/ti/p/CKwNd1lK9L"],
    ["LinkedIn", "https://www.linkedin.com/in/gakuto-nakano/"],
    ["Messenger", "https://m.me/renorari.san"],
    ["Misskey", "https://mi.cbrx.io/@renorari"],
    ["Reddit", "https://www.reddit.com/user/renorari"],
    ["RedNote", "http://xhslink.com/m/ChvcqehFsB"],
    ["Snapchat", "https://www.snapchat.com/add/renorari"],
    ["Steam", "https://steamcommunity.com/id/renorari"],
    ["Telegram", "https://t.me/renorari"],
    ["Threads", "https://threads.net/@renorari.san"],
    ["Twitch", "https://www.twitch.tv/renorari_san"],
    ["VK", "https://vk.com/renorari"],
    ["WeChat", "https://u.wechat.com/kHzZHvxq38ToqcyZLDxu7LI?s=2"],
    ["Weibo", "https://weibo.com/renorari"],
    ["WhatsApp", "https://wa.me/817090292952"],
    ["wonderful.dev", "https://wonderful.dev/renorari"],
    ["X", "https://x.com/renorari"],
    ["Xbox", "https://account.xbox.com/en-us/profile?gamertag=x%20renorari%20x"],
    ["YouTube", "https://www.youtube.com/@mozbek-dayo"]
] as const;

const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "PRODID:-//renorari.net//Business Card//JA//",
    "UID:mailto:gakuchan.256@gmail.com",
    "N:中野;楽士;;;",
    "FN:楽士 中野",
    "X-PHONETIC-LAST-NAME:ナカノ",
    "X-PHONETIC-FIRST-NAME:ガクト",
    "NICKNAME:がくちゃん",
    "BDAY:2007-12-18",
    "TITLE:ソフトウエア エンジニア",
    "ROLE:Software Engineer",
    "EMAIL;TYPE=INTERNET:renorari@renorari.net",
    "EMAIL;TYPE=INTERNET:gakuchan.256@gmail.com",
    "EMAIL;TYPE=INTERNET:gakuchan.256@icloud.com",
    "TEL;TYPE=pref:070 9029 2952",
    "URL;TYPE=pref:https://github.com/renorari",
    "URL:https://renorari.net/business-card/",
    "URL:https://renorari.net/",
    ...socialProfiles.flatMap(([service, url]) => [
        `X-SOCIALPROFILE;TYPE=${service}:${url}`,
        `URL;X-SERVICE-TYPE=${service}:${url}`
    ]),
    "IMPP;X-SERVICE-TYPE=Skype;TYPE=HOME;TYPE=pref:skype:gakutyn.2020",
    "URL;X-SERVICE-TYPE=Skype:skype://live:gakutyn.2020?add",
    "CATEGORIES:エンジニア,学生,Startup Weekend Nagaoka",
    `NOTE:${escapeVCardText("作る力で、未来をワクワクに。\nStartup Weekend 長岡 オーガナイザー代表\n長岡高専アントレプレナークラブ 代表")}`,
    "END:VCARD"
].flatMap(foldVCardLine);

export async function downloadVCard() {
    try {
        const response = await fetch("/images/gakuto.jpg");
        if (!response.ok) {
            throw new Error(`プロフィール画像の取得に失敗しました（${response.status}）`);
        }

        const imageBytes = new Uint8Array(await response.arrayBuffer());
        let binary = "";
        for (let index = 0; index < imageBytes.length; index += 0x8000) {
            binary += String.fromCharCode(...imageBytes.subarray(index, index + 0x8000));
        }

        const imageBase64 = btoa(binary);
        const lines = [
            ...vCardLines.slice(0, -1),
            ...foldVCardLine(`PHOTO;ENCODING=b;TYPE=JPEG:${imageBase64}`),
            "END:VCARD"
        ];
        const blob = new Blob([`${lines.join("\r\n")}\r\n`], { "type": "text/vcard" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "中野楽士.vcf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("vCardの作成に失敗しました:", error);
        window.alert("vCardを作成できませんでした。時間をおいてもう一度お試しください。");
    }
}
