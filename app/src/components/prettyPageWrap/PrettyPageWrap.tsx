import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ManageTeams from "./ManageTeams";
import NameNav from "./NameNav";
import SignOutButton from "./SignOutButton";

const BrandLink = styled(Link)`
    font-family: var(--open-sans);
    font-weight: 800;
    font-size: 30px;
    color: var(--purp-selected);
    text-decoration: none !important;

    &:hover {
        color: var(--purp-selected-hover);
    }
`;

const PrettyPageWrap: React.FunctionComponent = ({
    children,
    isAdmin,
    setLoggedIn,
    name,
    loggedIn,
}) => (
    <>
        <header>
            <nav className="navbar bg-light">
                <BrandLink to="/">SnapCup</BrandLink>

                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <ManageTeams isAdmin={isAdmin} />
                    </li>
                    <li className="nav-item">
                        {loggedIn && (
                            <SignOutButton setLoggedIn={setLoggedIn} />
                        )}
                    </li>
                    <li className="nav-item">
                        <NameNav name={name} />
                    </li>
                </ul>
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
