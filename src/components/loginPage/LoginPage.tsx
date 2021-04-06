import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import AuthService from "../../firebase/AuthService";

interface Props {
    authService: AuthService;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const LoginPage: React.FunctionalComponent<Props> = ({
    authService,
    setLoggedIn,
}) => {
    const [loginError, setLoginError] = useState("");

    const onSignInSuccess = useCallback(() => {
        setLoggedIn(true);
    }, [setLoggedIn]);

    return (
        <div className="text-center p-5">
            <h1>🥤 Welcome to SnapCup!</h1>
            <p className="m-5 h3">Share those warm fuzzies here!</p>
            <button
                onClick={() =>
                    authService.signIn(onSignInSuccess, setLoginError)
                }
                className="btn btn-primary"
            >
                Login
            </button>
            {loginError && <p className="m-2 text-danger">{loginError}</p>}
        </div>
    );
};

export default LoginPage;
