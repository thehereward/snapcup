import "./app.scss";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import PrettyPageWrap from "./components/prettyPageWrap/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import SubmissionPage from "./components/submissionPage/SubmissionPage";
import MentionElements from "./types/MentionElements";

import getSnappables from "./firebase/users/GetSnappables";
import {
    getCurrentUserName,
    onAuthStateChanged,
} from "./firebase/users/UserService";
import { getAllCups } from "./firebase/cups/CupService";
import { UserProfile } from "./types/UserProfile";
import AdminConsole from "./components/adminConsole/AdminConsole";
import ManageAdminsConsole from "./components/adminConsole/ManageAdminsConsole";
import { Entity } from "./types/Entity";
import Cup from "./types/Cup";
import Loading from "./components/Loading";

const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);
    const [snappables, setSnappables] = useState<MentionElements[]>([]);
    const [cups, setCups] = useState<Entity<Cup>[]>([]);
    const [loading, setLoading] = useState(false);

    const setUser = (profile: UserProfile) => {
        setLoading(true);
        setUserProfile(profile);
        setLoggedIn(true);
        setLoading(false);
    };

    const updateCups = async () => {
        try {
            const res = await getAllCups();
            setCups(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        onAuthStateChanged(setUser);
    }, [setLoggedIn, setUserProfile, setLoading]);

    useEffect(() => {
        if (loggedIn) {
            updateCups();
        }
    }, [setCups, loggedIn]);

    useEffect(async () => {
        try {
            const snappables = await getSnappables();
            const mentionElements: MentionElements[] = snappables.map((s) => {
                return { id: s.id, display: s.fullName };
            });
            setSnappables(mentionElements);
        } catch (error) {
            console.log(error.message);
        }
    }, [setSnappables, getSnappables]);

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
                            <AdminConsole
                                cups={cups}
                                setCups={setCups}
                                updateCups={updateCups}
                            />
                        </Route>
                    )}
                    {userProfile?.isAdmin && (
                        <Route path="/manage-admins">
                            <ManageAdminsConsole />
                        </Route>
                    )}
                    <Route path="/">
                        <SubmissionPage
                            snappables={snappables}
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
