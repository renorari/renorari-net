import React from "react";

import CardList from "./CardList";
import ImageCard from "./ImageCard";

export default function ToolsList() {
    return (
        <CardList>
            <ImageCard title="Renorari Generator" image="/images/tools/generator.svg" link="/tools/generator" />
            <ImageCard title="!Beep" image="/images/tools/beep.svg" link="/tools/beep" />
            <ImageCard title="QR Code Generator" image="/images/tools/qr.svg" link="/tools/qr" />
            <ImageCard title="AviUtl Aspect Ratio" image="/images/tools/aspect.svg" link="/tools/aspect" />
            <ImageCard title="Thumbnail Maker" image="/images/tools/thumbnail-maker.svg" link="/tools/thumbnail-maker" />
            <ImageCard title="Discord Channel Namer" image="/images/tools/discord-channel.svg" link="/tools/discord-channel" />
            <ImageCard title="Block Checker" image="/images/tools/block-checker.svg" link="/tools/block-checker" />
        </CardList>
    );
}