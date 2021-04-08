import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";

import {
    getCurrentUserName,
    onAuthStateChanged,
} from "./firebase/users/UserService";
import { UserProfile } from "./types/UserProfile";
import AdminConsole from "~components/adminConsole/AdminConsole";

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);

    const setUser = (profile: UserProfile) => {
        setUserProfile(profile);
        setLoggedIn(true);
    };

    useEffect(() => {
        onAuthStateChanged(setUser);
    }, [setLoggedIn, setUserProfile]);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                isAdmin={userProfile.isAdmin}
                setLoggedIn={setLoggedIn}
            >
                <h1>Hi {getCurrentUserName()}!</h1>
                <Switch>
                    {userProfile.isAdmin && (
                        <Route path="/admin">
                            <AdminConsole />
                        </Route>
                    )}
                    <Route path="/">
                        <SubmissionPage />
                    </Route>
                </Switch>
            </PrettyPageWrap>
        );
    } else {
        return <LoginPage setLoggedIn={setLoggedIn} />;
    }
};

export default App;
