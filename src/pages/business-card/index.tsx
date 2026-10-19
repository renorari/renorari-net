"use client";
import "./style.css";

import { ArrowDownToLine, Envelope, Handset, Comment } from "@gravity-ui/icons";
import React from "react";

import CardList from "../../components/CardList";
import ImageCard from "../../components/ImageCard";
import Metadata from "../../components/Metadata";
import ShareButton from "../../components/ShareButton";
import { downloadVCard } from "./vcard";

function Gap() {
    return (
        <span className="slash-gap">
            /
        </span>
    );
}

function Actions() {
    return (
        <div className="actions">
            <ShareButton />

            <button type="button" onClick={downloadVCard} aria-label="連絡先をvCardとして保存" title="連絡先をvCardとして保存">
                <ArrowDownToLine className="icon" width="1em" height="1em" aria-hidden="true" />
            </button>
        </div>
    );
}

const works = [
    {
        "link": "https://apps.apple.com/ja/app/danotes/id6756778682",
        "title": "DaNotes",
        "image": "/images/business-card/works/danotes.png"
    },
    {
        "link": "https://apps.apple.com/ja/app/accordview/id6788015627",
        "title": "AccordView",
        "image": "/images/business-card/works/accordview.png"
    },
    {
        "title": "Auto Meet Record",
        "image": "/images/business-card/works/auto-meet-record.png"
    },
    {
        "link": "https://welcome.unifes.org/",
        "title": "Unifes Welcome Party 2026",
        "image": "/images/business-card/works/unifes-wp.png"
    },
    {
        "title": "Unifes Unilog",
        "image": "/images/business-card/works/unilog.png"
    },
    {
        "link": "https://kome100.org/",
        "title": "米百俵アカデミー",
        "image": "/images/business-card/works/kome100.png"
    },
    {
        "link": "https://deliheart.jp/",
        "title": "デリハート",
        "image": "/images/business-card/works/deliheart.png"
    },
    {
        "link": "https://eventapo.com/",
        "title": "Eventapo",
        "image": "/images/business-card/works/eventapo.png"
    },
    {
        "link": "https://torusaito.com/camp/",
        "title": "そしぼく実践キャンプ",
        "image": "/images/business-card/works/hint-camp.png"
    },
    {
        "link": "https://torusaito.com/camp/",
        "title": "ミエルカイギ",
        "image": "/images/business-card/works/mierukaigi.png"
    },
    {
        "link": "https://nitnc.club/",
        "title": "NITNC.CLUB ポータル",
        "image": "/images/business-card/works/nitnc-club-portal.png"
    },
    {
        "link": "https://entre.nitnc.club/",
        "title": "長岡高専アントレプレナークラブ",
        "image": "/images/business-card/works/entre.png"
    }
];

const communities = [
    {
        "title": "Startup Weekend Nagaoka",
        "link": "https://swnagaoka.peatix.com/",
        "image": "/images/business-card/communities/sw-nagaoka.png",
        "newTab": true
    },
    {
        "title": "Unifes",
        "link": "https://unifes.org/",
        "image": "/images/business-card/communities/unifes.png",
        "newTab": true
    },
    {
        "title": "DERTA Community",
        "link": "https://derta.co.jp/community#community",
        "image": "/images/business-card/communities/derta-community.png",
        "newTab": true
    },
    {
        "title": "米百俵アカデミー",
        "link": "https://kome100.org/",
        "image": "/images/business-card/communities/kome100.png",
        "newTab": true
    },
    {
        "title": "DevPack",
        "image": "/images/business-card/communities/devpack.png"
    }
];

const socialLinks = [
    ["BeReal", "https://bere.al/renorari", true],
    ["Bluesky", "https://bsky.app/profile/renorari.net", true],
    ["Discord", "https://discord.com/users/698395012219666432", true],
    ["Facebook", "https://facebook.com/renorari.san", true],
    ["FaceTime", "facetime://+817090292952", false],
    ["GitHub", "https://github.com/renorari", true],
    ["Instagram", "https://instagram.com/renorari.san", true],
    ["Jiffcy", "https://api.jiffcy.com/shares/gykwhld", true],
    ["KakaoTalk", "http://qr.kakao.com/talk/A3q8FUXaiSBv5qwT4LbMigxTgSk-", true],
    ["LINE", "https://line.me/ti/p/CKwNd1lK9L", true],
    ["LinkedIn", "https://www.linkedin.com/in/gakuto-nakano/", true],
    ["Messenger", "https://m.me/renorari.san", true],
    ["Misskey", "https://mi.cbrx.io/@renorari", true],
    ["Reddit", "https://www.reddit.com/user/renorari", true],
    ["rednote", "http://xhslink.com/m/ChvcqehFsB", true],
    ["Skype", "skype://live:gakutyn.2020?add", false],
    ["Snapchat", "https://www.snapchat.com/add/renorari", true],
    ["Steam", "https://steamcommunity.com/id/renorari", true],
    ["Telegram", "https://t.me/renorari", true],
    ["Threads", "https://threads.net/@renorari.san", true],
    ["Twitch", "https://www.twitch.tv/renorari_san", true],
    ["VK", "https://vk.com/renorari", true],
    ["WeChat", "https://u.wechat.com/kHzZHvxq38ToqcyZLDxu7LI?s=2", true],
    ["Weibo", "https://weibo.com/renorari", true],
    ["WhatsApp", "https://wa.me/817090292952", true],
    ["wonderful.dev", "https://wonderful.dev/renorari", true],
    ["X", "https://x.com/renorari", true],
    ["Xbox", "https://account.xbox.com/en-us/profile?gamertag=x%20renorari%20x", true],
    ["YouTube", "https://www.youtube.com/@mozbek-dayo", true]
] as const;

const affiliations = {
    "en": {
        "school": ["Nagaoka College, National Institute of Technology", "https://nagaoka-ct.ac.jp/"],
        "companies": [
            ["Kontas Inc.", "https://kontas-happy.studio.site/"],
            ["DERTA Inc.", "https://derta.co.jp/"],
            ["hint Inc.", "https://hint.co.jp/"],
            ["MELHE UI Co., Ltd.", "https://melheui.jp/"]
        ],
        "communities": [
            ["Startup Weekend Nagaoka", "https://swnagaoka.peatix.com/", "Lead-Organiser"],
            ["Entrepreneur Club(NITNC)", "https://entre.nitnc.club/", "President"]
        ]
    },
    "ja": {
        "school": ["長岡工業高等専門学校", "https://nagaoka-ct.ac.jp/"],
        "companies": [
            ["㈱ コンタス", "https://kontas-happy.studio.site/"],
            ["㈱ DERTA", "https://derta.co.jp/"],
            ["㈱ hint", "https://hint.co.jp/"],
            ["㈱ メルエUI", "https://melheui.jp/"]
        ],
        "communities": [
            ["Startup Weekend 長岡", "https://swnagaoka.peatix.com/", "オーガナイザー代表"],
            ["長岡高専アントレプレナークラブ", "https://entre.nitnc.club/", "代表"]
        ]
    }
} as const;

const contactLinks = [
    ["mailto:gakuchan.256@gmail.com", "gakuchan.256@gmail.com", Envelope],
    ["tel:+817090292952", "070-9029-2952", Handset],
    ["sms:+817090292952", "070-9029-2952", Comment]
] as const;

function Affiliation({ language }: { language: keyof typeof affiliations }) {
    const { school, companies, communities } = affiliations[language];

    return (
        <p className="affiliation">
            <a href={school[1]} target="_blank" rel="noopener noreferrer">
                {school[0]}
            </a>
            <br />
            {companies.map(([title, href], index) => (
                <React.Fragment key={title}>
                    {index > 0 && <Gap />}
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </React.Fragment>
            ))}
            <br />
            {communities.map(([title, href, role], index) => (
                <React.Fragment key={title}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                    &nbsp;{role}
                    {index < communities.length - 1 && <br />}
                </React.Fragment>
            ))}
        </p>
    );
}

export default function BusinessCard() {
    return (
        <>
            <Metadata title="名刺" noindex />

            <main className="business-card-page">
                <input type="checkbox" id="business-card-flip" className="business-card-flip-toggle" aria-label="Switch language (EN / JA)" />
                <label htmlFor="business-card-flip" className="business-card-flipper">
                    <div className="business-card-inner">
                        <div className="business-card en">
                            <div className="name">
                                <div>
                                    <p className="job-title">
                                        Software Engineer
                                    </p>
                                    <h1 className="name-text">
                                        NAKANO, Gakuto
                                    </h1>
                                </div>
                                <Affiliation language="en" />
                            </div>
                            <div className="image">
                                <img src="/images/gakuto.jpg" alt="NAKANO, Gakuto" />
                                <p>
                                    Hi, I’m Gakuto.
                                    <br />
                                    I build -
                                    <br /> what the future needs.
                                </p>
                            </div>
                        </div>
                        <div className="business-card ja">
                            <div className="name">
                                <div>
                                    <p className="job-title">
                                        ソフトウエア エンジニア
                                    </p>
                                    <h1 className="name-text">
                                        中野 楽士
                                    </h1>
                                </div>
                                <Affiliation language="ja" />
                            </div>
                            <div className="image">
                                <img src="/images/gakuto.jpg" alt="NAKANO, Gakuto" />
                                <p>
                                    作る力で、
                                    <br />
                                    未来をワクワクに。
                                </p>
                            </div>
                        </div>
                    </div>
                </label>

                <section className="action">
                    <Actions />
                </section>

                <section className="self-introduction">
                    <img src="/images/gakuto.jpg" alt="NAKANO, Gakuto" />
                    <p className="self-introduction-text">
                        Hi, I’m Gakuto.
                        <br />
                        I build what the future needs.
                    </p>
                </section>

                <section className="works">
                    <h2 className="works-title">
                        Works
                    </h2>
                    <CardList>
                        {works.map((work) => (
                            <ImageCard
                                key={work.title}
                                {...work}
                                noTitle
                                newTab
                            />
                        ))}
                    </CardList>
                </section>

                <section className="communities">
                    <h2 className="communities-title">
                        Communities
                    </h2>
                    <CardList>
                        {communities.map((community) => (
                            <ImageCard
                                key={community.title}
                                {...community}
                                noTitle
                            />
                        ))}
                    </CardList>
                </section>

                <section className="contacts">
                    <h2>
                        Contacts
                    </h2>
                    <ul className="contacts-list">
                        {contactLinks.map(([href, label, Icon]) => (
                            <li key={href}>
                                <a href={href}>
                                    <Icon className="icon" width="1em" height="1em" aria-hidden="true" />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className="social-list">
                        {socialLinks.map(([title, href, newTab]) => (
                            <li key={title}>
                                <a
                                    href={href}
                                    {...(newTab ? { "target": "_blank", "rel": "noopener noreferrer" } : {})}
                                >
                                    {title}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <Actions />

                    <p>
                        &copy; 2026 NAKANO, Gakuto.
                    </p>
                </section>
            </main>
        </>
    );
}