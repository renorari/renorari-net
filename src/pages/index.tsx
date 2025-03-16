import "../styles/home.css";

import React from "react";
import CardList from "../components/CardList";
import ImageCard from "../components/ImageCard";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";

export default function HomePage() {
    return (
        <>
            <header>
                <div>
                    <h1>
                        <img src="/images/symbol-logo.svg" alt="🙂" width="419px" height="48px" />
                    </h1>
                    <p>
                        このページでは、れのらりが運営しているサービスや、ソフトウェアについて紹介しています。
                    </p>
                </div>
            </header>

            <NavBar />

            <main>
                <section id="profile">
                    <ProfileCard showTitle />
                </section>
                <section id="blog">
                    <h2>
                        最新のブログ記事
                    </h2>
                    <p>
                        最近のブログ記事をダイジェストで紹介します。
                    </p>
                    {/* ここにブログのカードが入る */}
                </section>
                <section id="tools">
                    <h2>
                        ウェブツール
                    </h2>
                    <p>
                        れのらりが作成したウェブツール集です。
                        <br />
                        ぜひ、ご活用ください。
                    </p>
                </section>
                <section id="services">
                    <h2>
                        関連サービス一覧
                    </h2>
                    <p>
                        れのらりが作成しているサービスや、運営や手伝いをしているサービスです。
                    </p>

                    <CardList>
                        <ImageCard title="Deliheart" image="/images/services/deliheart.svg" link="https://deliheart.jp/" />
                        <ImageCard title="Eventapo" image="/images/services/eventapo.svg" link="https://eventapo.com/" />
                        <ImageCard title="Kana" image="/images/services/kana.svg" link="https://kana.renorari.net/" />
                        <ImageCard title="Kanationary" image="/images/services/kanationary.svg" link="https://kanationary.renorari.net/" />
                        <ImageCard title="VoiceJP" image="/images/services/voicejp.svg" link="https://voicejp.renorari.net/" />
                        <ImageCard title="Union Global Chat" image="/images/services/ugc.svg" link="https://ugc.renorari.net/" />
                    </CardList>
                </section>
                <section id="communities">
                    <h2>
                        関連コミュニティ一覧
                    </h2>
                    <p>
                        れのらりに関係しているグループやコミュニティの一覧です。
                    </p>

                    <CardList>
                        <ImageCard title="DERTA Gig" image="/images/communities/derta.svg" link="https://derta.co.jp/" />
                        <ImageCard title="Startup Weekend 長岡" image="/images/communities/sw-nagaoka.svg" link="https://swnagaoka.doorkeeper.jp/" />
                        <ImageCard title="Japan Student DAO" image="/images/communities/js-dao.svg" link="https://vivixy.co.jp/" />
                        <ImageCard title="Nagaoka DAO" image="/images/communities/nagaoka-dao.svg" />
                    </CardList>
                </section>
                <section id="discord-servers">
                    <h2>
                        Discordサーバー
                    </h2>
                    <p>
                        れのらりがおすすめするDiscordサーバーです。
                    </p>

                    <CardList>
                        <ImageCard title="Juicy Server" image="/images/discord/juicy.svg" link="https://discord.gg/ahd4aVgxeb" />
                    </CardList>
                </section>
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};