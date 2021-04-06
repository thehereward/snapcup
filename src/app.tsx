import "./app.scss";

import React, { useState } from "react";
import AuthService from "./firebase/AuthService";
import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";

const authService = new AuthService();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    if (loggedIn) {
        return (
            <PrettyPageWrap>
                <h1>Woo logged in!!!</h1>
            </PrettyPageWrap>
        );
    } else {
        return (
            <PrettyPageWrap>
                <LoginPage
                    authService={authService}
                    setLoggedIn={setLoggedIn}
                />
            </PrettyPageWrap>
        );
    }
};

export default App;
