import "./Card.css";

import React from "react";
import { Link, LinkProps } from "waku/router/client";

type CardProps = {
    title: string;
    link?: LinkProps["to"];
    children: React.ReactNode;
};

export default function Card({ title, link, children }: CardProps) {
    const card = (
        <div className="card">
            <div className="card-title">
                {title}
            </div>
            <div className="card-content">
                {children}
            </div>
        </div>
    );

    return (
        link ? (
            <Link to={link} className="card-link">
                {card}
            </Link>
        ) : card
    );
}