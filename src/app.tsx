import "./app.scss";

import React, { useState } from "react";
import AuthService from "./firebase/AuthService";
import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutButton from "./components/logoutButton";

const authService = new AuthService();

const App = () => {
                    // Boolean declaring if user is logged in
    const [loggedIn, setLoggedIn] = useState(false);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                navExtra={<LogoutButton setLoggedIn={setLoggedIn} />}
            >
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
