import React, { useCallback } from "react";
import { signOut } from "../../firebase/users/UserService";
import NavItem from "./NavItem";

const SignOutButton: React.FunctionComponent = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await signOut();
            setLoggedIn(false);
        })();
    }, [setLoggedIn]);

    return <NavItem onClick={logout}>Sign Out</NavItem>;
};

export default SignOutButton;
