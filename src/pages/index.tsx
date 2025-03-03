import React from "react";
import Card from "../components/Card";
import ImageCard from "../components/ImageCard";
import CardList from "../components/CardList";

export default function HomePage() {
    return (
        <main>
            <h1>テスト</h1>
            <h2>これはテストです</h2>
            <p>
                本文です。
            </p>
            <CardList>
                <Card title="カード" link="/about">
                    <p>カードの内容です。</p>
                </Card>
                <ImageCard title="画像カード" link="/contact" image="/images/services/eventapo.jpg" />

                <ImageCard title="画像カード" link="/contact" image="/images/services/eventapo.jpg" />

                <ImageCard title="画像カード" link="/contact" image="/images/services/eventapo.jpg" />

                <ImageCard title="画像カード" link="/contact" image="/images/services/eventapo.jpg" />

                <ImageCard title="画像カード" link="/contact" image="/images/services/eventapo.jpg" />

                <ImageCard title="画像カード" link="/contact" image="/images/services/eventapo.jpg" />
            </CardList>
        </main>
    );
}