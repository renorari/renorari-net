import React, { ReactNode } from "react";

function Icon({ children, fill = "none" }: { children: ReactNode, fill?: string }) {
    return (
        <svg className="icon" viewBox="0 0 24 24" width="1em" height="1em" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

export function HeartIcon({ filled = false }: { filled?: boolean }) {
    return (
        <Icon fill={filled ? "currentColor" : "none"}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </Icon>
    );
}

export function ArrowRightIcon() {
    return <Icon><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
}

export function ArrowUpRightIcon() {
    return <Icon><path d="M7 17 17 7M8 7h9v9" /></Icon>;
}

export function ChevronRightIcon() {
    return <Icon><path d="m9 6 6 6-6 6" /></Icon>;
}
