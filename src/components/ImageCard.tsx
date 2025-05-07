import "./Card.css";

import React from "react";
import { Link, LinkProps } from "waku/router/client";

type ImageCardProps = {
    title: string;
    link?: LinkProps["to"] | `${string}://${string}`;
    image: string;
    className?: string | undefined;
};

export default function ImageCard({ title, link, image, className = "" }: ImageCardProps) {
    const card = (
        <div className={`card image-card ${className}`}>
            <img src={image} alt={title + "の画像"} className="card-image" />
            <div className="card-title">
                {title}
            </div>
        </div>
    );

    return (
        link ?
            typeof link === "string" ? 
                (
                    <a href={link} className="card-link">
                        {card}
                    </a>
                ) : (
                    <Link to={link} className="card-link">
                        {card}
                    </Link>
                )
            : card
    );
}