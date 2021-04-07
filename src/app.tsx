import "./app.scss";

import React, { useState } from "react";
import AuthService from "./firebase/AuthService";
import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutButton from "./components/logoutButton";
import SubmissionTextBox from "./components/submissionPage/SubmissionTextBox";

const authService = new AuthService();

const App = () => {
    // Blafh blah sdfsf
    const [loggedIn, setLoggedIn] = useState(false);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                navExtra={<LogoutButton setLoggedIn={setLoggedIn} />}
            >
                <SubmissionTextBox />
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
