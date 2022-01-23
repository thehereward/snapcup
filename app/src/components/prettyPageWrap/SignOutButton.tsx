import React, { useCallback } from "react";
import { signOut } from "../../firebase/users/UserService";
import { NavItemClickable } from "./NavItem";

const SignOutButton = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await signOut();
            setLoggedIn(false);
        })();
    }, [setLoggedIn]);

    return (
        <NavItemClickable className="nav-link" onClick={logout}>
            Sign Out
        </NavItemClickable>
    );
};

export default SignOutButton;
