import React, { useCallback } from "react";
import { signOut } from "../../firebase/AuthService";
import { NavItemClickable } from "./NavItem";

const SignOutButton: React.FunctionComponent = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await signOut();
            setLoggedIn(false);
        })();
    }, [setLoggedIn]);

    return <NavItemClickable onClick={logout}>Sign Out</NavItemClickable>;
};

export default SignOutButton;
