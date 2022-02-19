import React, { useCallback } from "react";
import { signOut } from "../../firebase/users/UserService";

const SignOutButton = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await signOut();
            setLoggedIn(false);
        })();
    }, [setLoggedIn]);

    return (
        <button
            className="nav-link font-family-open-sans fw-bold cursor_pointer my-clickable-nav-item colour-secondary colour-primary-on-hover font-size-20"
            onClick={logout}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
