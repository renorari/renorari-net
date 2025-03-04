import "../styles/home.css";

import React from "react";
import { Link } from "waku";

import Card from "../components/Card";
import CardList from "../components/CardList";
import ImageCard from "../components/ImageCard";
import NavBar from "../components/NavBar";

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
                    <Card title="プロフィール" style={{"display": "flex", "gap": "1rem", "flexWrap": "wrap", "justifyContent": "center"}}>
                        <div className="avatar">
                            <img src="/images/renorari.png" alt="れのらりのアバター" width="128px" height="128px" style={{"borderRadius": "100vw"}} />
                        </div>
                        <div className="profile">
                            <h3 className="name">
                                れのらり
                            </h3>
                            <p className="description">
                                趣味と仕事でプログラムを書いています。
                                <br />
                                主にWeb開発をしていますが、他にもいろいろな言語を使って開発しています。
                                <br />
                                最近は、DiscordBOTの開発にも興味を持っています。
                                <br />
                                また、自分のサービスを提供しています。
                                詳しくは、
                                <Link to="/#services">関連サービス一覧</Link>
                                をご覧ください。
                            </p>
                        </div>
                    </Card>
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
                    <h3>
                        Discordサーバー
                    </h3>
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