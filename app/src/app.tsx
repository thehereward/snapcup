import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";
import GetSnappables from "./firebase/users/GetSnappables";
import {
    getCurrentUserName,
    onAuthStateChanged,
} from "./firebase/users/UserService";
import { UserProfile } from "./types/UserProfile";
import AdminConsole from "./components/adminConsole/AdminConsole";
import MentionElements from "./types/MentionElements";
import Snappable from "./types/Snappable";

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);
    const [snappables, setSnappables] = useState<MentionElements[]>([]);

    const setUser = (profile: UserProfile) => {
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
                    {userProfile.isAdmin && (
                        <Route path="/admin">
                            <AdminConsole />
                        </Route>
                    )}
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
