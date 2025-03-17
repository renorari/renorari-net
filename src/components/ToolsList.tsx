import React from "react";

import CardList from "./CardList";
import ImageCard from "./ImageCard";

export default function ToolsList() {
    return (
        <CardList>
            <ImageCard title="Renorari Generator" image="/images/tools/generator.svg" link="/tools/generator" />
            <ImageCard title="!Beep" image="/images/tools/beep.svg" link="/tools/beep" />
            <ImageCard title="QR Code Generator" image="/images/tools/qr.svg" link="/tools/qr" />
        </CardList>
    );
}