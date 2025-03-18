"use server";

interface UserCollection {
    [key: string]: {
        userId: string;
        reason: string;
    };
}

interface GuildCollection {
    [key: string]: {
        guildId: string;
        reason: string;
    };
}

const kanaUrl = process.env.KANA_URL ?? "https://kana.renorari.net";
const takasumiUrl = process.env.TAKASUMI_URL ?? "https://api.takasumibot.com";

async function kanaUserBlock(): Promise<UserCollection> {
    const res = await fetch(`${kanaUrl}/api/v2/discord/nr_users`);
    return await res.json();
}

async function kanaGuildBlock(): Promise<GuildCollection> {
    const res = await fetch(`${kanaUrl}/api/v2/discord/nr_guilds`);
    return await res.json();
}

async function ugcUserBlock(): Promise<UserCollection> {
    const res = await fetch(`${kanaUrl}/api/v2/discord/muted_users`);
    return await res.json();
}

async function ugcGuildBlock(): Promise<GuildCollection> {
    const res = await fetch(`${kanaUrl}/api/v2/discord/muted_guilds`);
    return await res.json();
}

async function takasumiBlock(): Promise<UserCollection> {
    const res = await fetch(`${takasumiUrl}/v1/mute_user`);
    const json = await res.json();
    const takasumibotMuted: UserCollection = {};
    json.data.forEach((user: { id: string; reason: string; }) => {
        takasumibotMuted[user.id] = { "userId": user.id, "reason": user.reason };
    });
    return takasumibotMuted;
}

export default async function checkBlock(id: string): Promise<{ kana: boolean, kanaIsRemovable: boolean, ugc: boolean, takasumi: boolean }> {
    const kanaUser = await kanaUserBlock();
    const kanaGuild = await kanaGuildBlock();
    const ugcUser = await ugcUserBlock();
    const ugcGuild = await ugcGuildBlock();
    const takasumi = await takasumiBlock();

    return {
        "kana": Object.keys(kanaUser).includes(id) || Object.keys(kanaGuild).includes(id),
        "ugc": Object.keys(ugcUser).includes(id) || Object.keys(ugcGuild).includes(id),
        "takasumi": Object.keys(takasumi).includes(id),
        "kanaIsRemovable": Object.keys(kanaUser).includes(id) ? (kanaUser[id]?.reason.includes("荒らし関連のユーザー") ? true : false) : false
    };
}