import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import {
    CupAdminPage,
    CupPage,
    LoginPage,
    ManageCupsPage,
    ManageAdminsPage,
    SubmissionPage,
} from "./components/pages";

import { onAuthStateChanged } from "./firebase/users/UserService";
import { UserProfile } from "./types";
import Loading from "./components/Loading";

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const setUser = (profile: UserProfile) => {
        setUserProfile(profile);
        setLoggedIn(true);
    };

    useEffect(() => {
        onAuthStateChanged(setUser);
        setLoading(false);
    }, [setLoggedIn, setUserProfile, setLoading]);

    if (loading) {
        return <Loading />;
    }

    if (!loggedIn) {
        return <LoginPage />;
    }

    return (
        <PrettyPageWrap
            isAdmin={userProfile?.isAdmin}
            setLoggedIn={setLoggedIn}
        >
            <Switch>
                <Route path="/cups/:id">
                    <CupPage />
                </Route>
                {userProfile?.isAdmin && (
                    <Route path="/manage/cups/:id" exact={true}>
                        <CupAdminPage />
                    </Route>
                )}
                {userProfile?.isAdmin && (
                    <Route path="/manage/cups">
                        <ManageCupsPage />
                    </Route>
                )}
                {userProfile?.isAdmin && (
                    <Route path="/manage/admins">
                        <ManageAdminsPage />
                    </Route>
                )}
                <Route path="/">
                    <SubmissionPage />
                </Route>
            </Switch>
        </PrettyPageWrap>
    );
};

export default App;
