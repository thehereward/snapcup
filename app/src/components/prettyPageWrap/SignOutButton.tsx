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
            className="nav-link my-clickable-nav-item hover-purple-selected font-size-20"
            onClick={logout}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
