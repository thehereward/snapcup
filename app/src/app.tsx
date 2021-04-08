import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";

// Snapitform
import SnapItForm from "./components/submissionPage/SnapItForm";

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
                isAdmin={userProfile.isAdmin}
                setLoggedIn={setLoggedIn}
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
        return <LoginPage setLoggedIn={setLoggedIn} />;
    }
};

export default App;
