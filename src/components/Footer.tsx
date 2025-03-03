import "./Footer.css";

import React from "react";
import { Link } from "waku";

export default function Footer() {
    return (
        <footer>
            <div className="about-me">
                <p className="copyright">
                    &copy; 2025 Renorari
                </p>
                <ul className="social">
                    <li>
                        <a href="https://discord.gg/ahd4aVgxeb" target="_blank" rel="noopener noreferrer">
                            <img src="/images/social/discord.svg" alt="Discord" />
                        </a>
                    </li>
                    <li>
                        <a href="https://bsky.app/profile/renorari.net" target="_blank" rel="noopener noreferrer">
                            <img src="/images/social/bluesky.svg" alt="BlueSky" />
                        </a>
                    </li>
                    <li>
                        <a href="https://youtube.com/@mozbek-dayo" target="_blank" rel="noopener noreferrer">
                            <img src="/images/social/youtube.svg" alt="YouTube" />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/renorari" target="_blank" rel="noopener noreferrer">
                            <img src="/images/social/github.svg" alt="GitHub" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="links">
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/legal/privacy">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/legal/disclaimer">Disclaimer</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}