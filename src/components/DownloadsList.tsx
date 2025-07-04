import React from "react";

import CardList from "./CardList";
import ImageCard from "./ImageCard";

export default function DownloadsList() {
    return (
        <CardList>
            <ImageCard title="【UST配布】Säkkijärven Polkka" image="/images/downloads/sakkijarven-polkka-ust.svg" link="/downloads/sakkijarven-polkka-ust" />
            <ImageCard title="【動画配布】Säkkijärven Polkka" image="/images/downloads/sakkijarven-polkka-video.svg" link="/downloads/sakkijarven-polkka-video" />
            <ImageCard title="【UST/Inst配布】Голубой вагон" image="/images/downloads/goluboi-vagon.svg" link="/downloads/goluboi-vagon" />
            <ImageCard title="DaNotes" image="/images/downloads/danotes.svg" link="/downloads/danotes" />
        </CardList>
    );
}
