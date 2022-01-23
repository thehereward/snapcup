import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import { signIn } from "../../firebase/users/UserService";
// @ts-ignore
import Elle from "../../images/Elle";
import Loading from "../Loading";

const LoginPage = () => {
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = useCallback(async () => {
        setLoading(true);
        try {
            await signIn();
        } catch (err) {
            console.error(err);
            setLoginError("There was an error logging in! Please try again.");
        }
        setLoading(false);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="login-box">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6 order-2 order-sm-1 d-flex flex-column justify-content-center pt-4 login-page-column">
                        <h1>Snap Cup</h1>
                        <p>Send compliments to colleagues!</p>
                        <button
                            role="button"
                            className="btn btn-purple btn-lg mt-4"
                            onClick={handleSignIn}
                        >
                            Log In
                        </button>
                        {loginError && <i className="mt-2">{loginError}</i>}
                    </div>

                    <div className="col-12 col-sm-6 text-center order-1 order-sm-2">
                        <Elle className="login-page-elle-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
