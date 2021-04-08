import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";
import MentionElements from "./types/MentionElements";
import Snappable from "./types/Snappable";

import { onAuthStateChanged, ProfileData } from "./firebase/AuthService";
import GetSnappables from "./firebase/users/GetSnappables";

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);
    const [snappables, setSnappables] = useState<MentionElements[]>([]);

    const setUser = (profile: ProfileData) => {
        setUserProfile(profile);
        setLoggedIn(true);
    };

    useEffect(() => {
        onAuthStateChanged(setUser);
    }, [setLoggedIn, setUserProfile]);

    useEffect(() => {
        GetSnappables()
            .then((res: Snappable[]) => {
                const foundSnappables: MentionElements[] = [];
                for (let elem of res) {
                    foundSnappables.push({
                        id: elem.id,
                        display: elem.fullName,
                    });
                }
                setSnappables(foundSnappables);
            })
            .catch((e) => console.log(e));
    }, [setSnappables, GetSnappables]);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                isAdmin={userProfile.isAdmin}
                setLoggedIn={setLoggedIn}
            >
                <Switch>
                    <Route path="/admin">Admin page will go here.</Route>
                    <Route path="/">
                        <SubmissionPage snappables={snappables} />
                    </Route>
                </Switch>
            </PrettyPageWrap>
        );
    } else {
        return <LoginPage setLoggedIn={setLoggedIn} />;
    }
};

export default App;
