import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";
import MentionElements from "./types/MentionElements";

import { onAuthStateChanged } from "./firebase/users/UserService";
import { UserProfile } from "./types/UserProfile";
import AdminConsole from "./components/adminConsole/AdminConsole";
import ManageAdminsConsole from "./components/adminConsole/ManageAdminsConsole";
import Loading from "./components/Loading";
import Snappable from "~types/Snappable";
import { useSnappablePeople } from "./firebase/hooks/UseSnappablePeopleHook";
import { useCups } from "./firebase/hooks/UseCupsHook";

const toMentionElements = (s: Snappable): MentionElements => {
    return { id: s.id, display: s.fullName };
};

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);
    const [snappables] = useSnappablePeople();
    const [cups] = useCups();
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
    } else if (loggedIn) {
        return (
            <PrettyPageWrap
                isAdmin={userProfile?.isAdmin}
                setLoggedIn={setLoggedIn}
            >
                <Switch>
                    {userProfile?.isAdmin && (
                        <Route path="/admin">
                            <AdminConsole />
                        </Route>
                    )}
                    {userProfile?.isAdmin && (
                        <Route path="/manage-admins">
                            <ManageAdminsConsole />
                        </Route>
                    )}
                    <Route path="/">
                        <SubmissionPage
                            snappables={snappables.map(toMentionElements)}
                            publishedCups={cups.filter(
                                (cup) => cup.isPublished == true
                            )}
                        />
                    </Route>
                </Switch>
            </PrettyPageWrap>
        );
    } else {
        return <LoginPage setLoggedIn={setLoggedIn} />;
    }
};

export default App;
