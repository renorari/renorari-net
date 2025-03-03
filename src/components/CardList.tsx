import React from "react";
import "./CardList.css";

type CardListProps = {
    children: React.ReactNode;
};

export default function CardList({ children }: CardListProps) {
    return (
        <div className="card-list">
            {children}
        </div>
    );
}
