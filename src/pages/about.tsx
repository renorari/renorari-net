import React from "react";
import ProfileCard from "../components/ProfileCard";
import CardList from "../components/CardList";
import ImageCard from "../components/ImageCard";
import ContactList from "../components/ContactList";

export default function AboutPage() {
    return (
        <main>
            <section id="profile">
                <h2>プロフィール</h2>
                <ProfileCard />
            </section>

            <section id="works">
                <h2>成果物</h2>
                <CardList>
                    <ImageCard title="Deliheart" image="/images/services/deliheart.svg" link="https://deliheart.jp/" />
                    <ImageCard title="Eventapo" image="/images/services/eventapo.svg" link="https://eventapo.com/" />
                    <ImageCard title="Kana" image="/images/services/kana.svg" link="https://kana.renorari.net/" />
                    <ImageCard title="Kanationary" image="/images/services/kanationary.svg" link="https://kanationary.renorari.net/" />
                    <ImageCard title="VoiceJP" image="/images/services/voicejp.svg" link="https://voicejp.renorari.net/" />
                    <ImageCard title="Union Global Chat" image="/images/services/ugc.svg" link="https://ugc.renorari.net/" />
                </CardList>
            </section>

            <section id="contact">
                <h2>連絡先</h2>
                <ContactList />
            </section>
        </main>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};