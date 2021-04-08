import React, { useCallback } from "react";
import { signOut } from "../firebase/users/UserService";

const LogoutButton = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await signOut();
            setLoggedIn(false);
        })();
    }, [setLoggedIn]);

    return (
        <button role="button" className="btn btn-primary" onClick={logout}>
            Log Out
        </button>
    );
};

export default LogoutButton;
