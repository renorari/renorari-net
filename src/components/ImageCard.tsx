import "./Card.css";

import { ArrowUpRight } from "@gravity-ui/icons";
import React from "react";
import { Link, LinkProps } from "waku/router/client";

type ImageCardProps = {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link?: LinkProps<any>["to"] | `${string}://${string}` | string;
    image: string;
    className?: string | undefined;
    noTitle?: boolean | undefined;
    newTab?: boolean | undefined;
    linkIcon?: boolean | undefined;
};

export default function ImageCard({ title, link, image, className = "", noTitle, newTab, linkIcon }: ImageCardProps) {
    const card = (
        <div className={`card image-card ${className}`}>
            <img src={image} alt={title + "の画像"} className="card-image" />
            {linkIcon && link &&
                <ArrowUpRight className="card-link-icon" width="1em" height="1em" aria-hidden="true" />
            }
            {!noTitle &&
                <div className="card-title">
                    {title}
                </div>
            }
        </div>
    );

    return (
        link ?
            typeof link === "string" ?
                newTab ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
                        {card}
                    </a>
                ) : (
                    <a href={link} className="card-link">
                        {card}
                    </a>
                ): (
                    <Link to={link} className="card-link">
                        {card}
                    </Link>
                )
            : card
    );
}