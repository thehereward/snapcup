import React from "react";
import { Link } from "react-router-dom";

import styled, { css } from "styled-components";
import SignOutButton from "./SignOutButton";
import { NavItem, NavItemClickable } from "./NavItem";

import { getCurrentUserName } from "../../firebase/AuthService";

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

const LinkList = styled.div`
    display: flex;
    align-items: center;
`;

const PrettyPageWrap: React.FunctionComponent = ({
    children,
    isAdmin,
    setLoggedIn,
}) => (
    <>
        <header>
            <nav className="navbar bg-light">
                <BrandLink to="/">SnapCup</BrandLink>

                <LinkList>
                    {isAdmin && (
                        <NavItemClickable as={Link} to="/admin">
                            Manage Teams
                        </NavItemClickable>
                    )}
                    <SignOutButton setLoggedIn={setLoggedIn} />
                    <NavItem>{getCurrentUserName()}</NavItem>
                </LinkList>
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
