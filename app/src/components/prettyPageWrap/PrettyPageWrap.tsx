import React from "react";
import { Link } from "react-router-dom";

import styled, { css } from "styled-components";
import SignOutButton from "./SignOutButton";
import { NavItem, NavItemClickable } from "./NavItem";
import Gravatar from "react-gravatar";

import {
    getCurrentUserName,
    getCurrentEmail,
} from "../../firebase/users/UserService";

const BrandLink = styled(Link)`
    font-family: var(--open-sans);
    font-weight: 800;
    font-size: 30px;
    color: var(--purple-selected);
    text-decoration: none !important;

    &:hover {
        color: var(--purple-selected-hover);
    }
`;

const LinkList = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImage = styled(Gravatar)`
    border-radius: 10px;
`;

const PrettyPageWrap: React.FunctionComponent = ({
    children,
    isAdmin,
    setLoggedIn,
}) => (
    <>
        <header className="sticky-top">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    Snap Cup
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarTogglerDemo01"
                >
                    <ul className="navbar-nav align-items-center">
                        {isAdmin && (
                            <>
                                <li className="nav-item">
                                    <NavItemClickable
                                        className="nav-link"
                                        as={Link}
                                        to="/manage-admins"
                                    >
                                        Manage Admins
                                    </NavItemClickable>
                                </li>
                                <li className="nav-item">
                                    <NavItemClickable
                                        className="nav-link"
                                        as={Link}
                                        to="/admin"
                                    >
                                        Manage Teams
                                    </NavItemClickable>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <SignOutButton
                                className="nav-link"
                                setLoggedIn={setLoggedIn}
                            />
                        </li>
                        <li className="nav-item">
                            <NavItem className="nav-link">
                                {getCurrentUserName()}
                            </NavItem>
                        </li>
                        <li className="nav-item">
                            <NavItem className="d-none d-sm-block">
                                <ProfileImage email={getCurrentEmail()} />
                            </NavItem>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
