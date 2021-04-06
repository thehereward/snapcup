import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import {signIn} from '../../firebase/AuthService';

interface Props {
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const LoginPage: React.FunctionalComponent<Props> = () => {
    const [loginError, setLoginError] = useState("");

    const handleSignIn = useCallback(() => {
        try {
            signIn();
        } catch {
            setLoginError("There was an error logging in! Please try again.")
        }
    }, []);

    return (
        <div className="text-center p-5">
            <h1>🥤 Welcome to SnapCup!</h1>
            <p className="m-5 h3">Share those warm fuzzies here!</p>
            <button
                onClick={() => handleSignIn()}
                className="btn btn-primary"
            >
                Login
            </button>
            {loginError && <p className="m-2 text-danger">{loginError}</p>}
        </div>
    );
};

export default LoginPage;
