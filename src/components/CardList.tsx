import React from "react";
import "./CardList.css";

type CardListProps = {
    children: React.ReactNode;
    className?: string;
};

export default function CardList({ children, className }: CardListProps) {
    return (
        <div className={`card-list ${className}`}>
            {children}
        </div>
    );
}
