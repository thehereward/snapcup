import "./app.scss";

import React, { useState, useEffect } from "react";

import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutButton from "./components/logoutButton";
import SubmissionTextBox from "./components/submissionPage/SubmissionTextBox";
import MentionElements from "./types/MentionElements";
import Snappable from "./types/Snappable";

import {
    getCurrentUserName,
    onAuthStateChanged,
    ProfileData,
} from "./firebase/AuthService";
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
                const snappables: MentionElements[] = [];
                for (let elem of res) {
                    snappables.push({ id: elem.id, display: elem.fullName });
                }
                setSnappables(snappables);
            })
            .catch((e) => console.log(e));
    }, [setSnappables]);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                navExtra={
                    <>
                        <div className="flex-grow-1" />
                        {userProfile.isAdmin && (
                            <span className="nav-item mr-2">
                                You are an admin
                            </span>
                        )}
                        <LogoutButton setLoggedIn={setLoggedIn} />
                    </>
                }
            >
                <h1>Hi {getCurrentUserName()}!</h1>
                <SubmissionTextBox
                    snappables={snappables}
                    user={getCurrentUserName()}
                />
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
