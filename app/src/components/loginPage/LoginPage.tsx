import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import { signIn } from "../../firebase/users/UserService";
import styled from "styled-components";
// @ts-ignore
import Elle from "../../images/Elle.svg";

interface Props {
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const LoginBox = styled.div`
    min-height: 100vh;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    @media only screen and (max-width: 576px) {
        max-width: 350px;
    }
`;

const FormColumn = styled.div`
    color: var(--purple-selected);

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 20px;

    h1 {
        font-family: var(--open-sans);
        font-weight: 800;
        font-size: 50px;
    }

    p {
        font-family: var(--asap);
        font-weight: normal;
        font-size: 22px;
    }
`;

const ElleImg = styled(Elle)`
    width: 100%;
    max-height: calc(100vh - 50px);

    @media only screen and (max-width: 576px) {
        max-width: 250px;
    }
`;

const LoginPage: React.FunctionalComponent<Props> = () => {
    const [loginError, setLoginError] = useState("");

    const handleSignIn = useCallback(() => {
        (async () => {
            try {
                await signIn();
            } catch (err) {
                console.error(err);
                setLoginError(
                    "There was an error logging in! Please try again."
                );
            }
        })();
    }, []);

    return (
        <LoginBox>
            <div className="flex-grow-1" />
            <div className="container-fluid">
                <div className="row">
                    <FormColumn className="col-12 col-sm-6 order-2 order-sm-1">
                        <h1>SnapCup</h1>
                        <p>Send compliments to colleagues!</p>

                        <button
                            role="button"
                            className="btn btn-purple btn-lg mt-4"
                            onClick={handleSignIn}
                        >
                            Log In
                        </button>
                        {loginError && <i className="mt-2">{loginError}</i>}
                    </FormColumn>

                    <div className="col-12 col-sm-6 text-center order-1 order-sm-2">
                        <ElleImg />
                    </div>
                </div>
            </div>

            <div className="flex-grow-1" />
        </LoginBox>
    );
};

export default LoginPage;
