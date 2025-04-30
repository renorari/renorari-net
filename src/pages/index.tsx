import React from "react";
import { Link } from "waku";

import BlogList from "../components/BlogList";
import CardList from "../components/CardList";
import Header from "../components/FullscreenHeader";
import ImageCard from "../components/ImageCard";
import Metadata from "../components/Metadata";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";
import ToolsList from "../components/ToolsList";

export default function HomePage() {
    return (
        <>
            <Metadata />

            <Header />
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
                    <BlogList amount={6} />
                    <Link to="/blog" className="button secondary">もっと見る</Link>
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
                    <ToolsList />
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
                <section id="links">
                    <h2>
                        相互リンク
                    </h2>
                    <p>
                        れのらりと相互リンクをしているサイトです。
                        <br />
                        それぞれ面白い特徴があるので、ぜひご覧ください。
                    </p>

                    <CardList>
                        <ImageCard title="TMKSoftのホームページ" image="/images/links/tmksoft.png" link="https://tmksoft.net/" className="dot ignore-aspect" />
                        <ImageCard title="naisuのホームページ" image="/images/links/naisu.png" link="https://naisu.moe/" className="ignore-aspect" />
                        <ImageCard title="をとすまっ！のページ" image="/images/links/wotosuma.png" link="https://wotosuma.f5.si/" className="dot ignore-aspect" />
                    </CardList>

                    <p>
                        もし、相互リンクをご希望の方は、お気軽に
                        <Link to="/contact">お問い合わせ</Link>
                        ください。
                        <br />
                        また、ぜひ以下のバナーをお使いください！
                    </p>
                    <CardList>
                        <ImageCard title="Renorari.net(SVG版 おすすめ)" image="/images/links/renorarinet.svg " className="ignore-aspect" />
                        <ImageCard title="Renorari.net(BMP版 要image-rendering設定)" image="/images/links/renorarinet.bmp" className="dot ignore-aspect" />
                    </CardList>
                </section>
            </main>
        </>
    );
}
