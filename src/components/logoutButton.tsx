import React, { useCallback } from "react";
import firebase from "firebase/app";

const LogoutButton = ({ setLoggedIn }) => {
    const logout = useCallback(() => {
        (async () => {
            await firebase.auth().signOut();
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
