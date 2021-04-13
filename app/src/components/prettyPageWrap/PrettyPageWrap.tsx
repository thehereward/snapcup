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
            <nav className="navbar bg-light">
                <BrandLink to="/">SnapCup</BrandLink>

                <LinkList>
                    {isAdmin && (
                        <>
                            <NavItemClickable as={Link} to="/manage-admins">
                                Manage Admins
                            </NavItemClickable>
                            <NavItemClickable as={Link} to="/admin">
                                Manage Teams
                            </NavItemClickable>
                        </>
                    )}
                    <SignOutButton setLoggedIn={setLoggedIn} />
                    <NavItem>{getCurrentUserName()}</NavItem>
                    <NavItem className="d-none d-sm-block">
                        <ProfileImage email={getCurrentEmail()} />
                    </NavItem>
                </LinkList>
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
