import "./Card.css";

import React, { CSSProperties, ReactNode } from "react";
import { Link, LinkProps } from "waku/router/client";

type CardProps = {
    title?: string | null;
    link?: LinkProps["to"] | `${string}://${string}`;
    style?: CSSProperties;
    className?: string | undefined;
    children: ReactNode;
};

export default function Card({ title, link, children,style, className = "" }: CardProps) {
    const card = (
        <div className={`card ${className}`}>
            {title && <div className="card-title">{title}</div>}
            <div className="card-content" style={style}>
                {children}
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