import React from "react";
import "./NavBar.css";
import { Link } from "waku";

function NavBar() {
    return (
        <nav>
            <h1>
                <Link to="/">
                    <img src="/images/logo.svg" alt="Renorari.net" />
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/blog">Blog</Link>
                </li>
                <li>
                    <Link to="/tools">Tools</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;