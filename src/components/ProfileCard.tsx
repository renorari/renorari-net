import React from "react";
import { Link } from "waku";

import Card from "./Card";

interface ProfileCardProps {
    showTitle?: boolean;
}

export default function ProfileCard({ showTitle = false }: ProfileCardProps) {
    return (
        <Card style={{ "display": "flex", "gap": "1rem", "flexWrap": "wrap", "justifyContent": "center" }} title={showTitle ? "プロフィール" : null}>
            <div className="avatar" style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <img src="/images/renorari.png" alt="れのらりのアバター" width="128px" height="128px" style={{ "borderRadius": "100vw" }} />
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
                    <Link to="/#services" scroll>関連サービス一覧</Link>
                    をご覧ください。
                </p>
            </div>
        </Card>
    );
}