import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";
import LogoutButton from "./components/logoutButton";

import {
    getCurrentUserName,
    onAuthStateChanged,
    ProfileData,
} from "./firebase/AuthService";

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);

    const setUser = (profile: ProfileData) => {
        setUserProfile(profile);
        setLoggedIn(true);
    };

    useEffect(() => {
        onAuthStateChanged(setUser);
    }, [setLoggedIn, setUserProfile]);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                navExtra={
                    <>
                        <div className="flex-grow-1" />
                        {userProfile.isAdmin && (
                            <Link to="/admin">Admin Console</Link>
                        )}
                        <LogoutButton setLoggedIn={setLoggedIn} />
                    </>
                }
            >
                <Switch>
                    <Route path="/admin">Admin page will go here.</Route>
                    <Route path="/">
                        <SubmissionPage />
                    </Route>
                </Switch>
            </PrettyPageWrap>
        );
    } else {
        return (
            <PrettyPageWrap>
                <LoginPage setLoggedIn={setLoggedIn} />
            </PrettyPageWrap>
        );
    }
};

export default App;
