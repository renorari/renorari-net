import React from "react";
import "./NavBar.css";
import { Link } from "waku";

function NavBar() {
    return (
        <nav>
            <h1>
                <img src="/images/logo.svg" alt="Renorari.net" />
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/blog">Blog</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;