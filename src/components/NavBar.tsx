import React from "react";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav>
            <h1>
                <img src="/images/logo.svg" alt="Renorari.net" />
            </h1>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;