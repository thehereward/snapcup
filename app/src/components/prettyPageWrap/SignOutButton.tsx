import React, { useCallback } from "react";
import { signOut } from "../../firebase/AuthService";
import styled from "styled-components";

const SignOutBut = styled.button`
    background-color: transparent;
`;

const SignOutText = styled.p`
    font-family: var(--open-sans);
    font-weight: 600;
    font-size: 20px;
    color: var(--purp-hover) !important;
    text-decoration: none !important;
    line-height: 27px;
    &:hover {
        color: var(--purp-selected) !important;
    }
`;

const SignOutButton: React.FunctionComponent = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await signOut();
            setLoggedIn(false);
        })();
    }, [setLoggedIn]);

    return (
        <SignOutBut role="button" className="btn" onClick={logout}>
            <SignOutText>Sign Out</SignOutText>
        </SignOutBut>
    );
};

export default SignOutButton;
