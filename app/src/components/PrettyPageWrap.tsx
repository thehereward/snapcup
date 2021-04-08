import React from "react";
import { Link } from "react-router-dom";

const PrettyPageWrap: React.FunctionComponent = ({ children, navExtra }) => (
    <>
        <header>
            <nav className="navbar bg-light">
                <Link to="/" className="navbar-brand">
                    🥤 SnapCup
                </Link>
                {navExtra}
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
