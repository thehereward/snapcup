import "./app.scss";

import React, { useState, useEffect } from "react";
import AuthService from "./firebase/AuthService";
import firebase from 'firebase/app';
import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutButton from "./components/logoutButton";
import SubmissionTextBox from "./components/submissionPage/SubmissionTextBox";
import GetSnappables from "./firebase/users/GetSnappables";
import MentionElements from "./types/MentionElements"
import Snappable from "./types/Snappable"

const authService = new AuthService();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [snappables, setSnappables] = useState<MentionElements[]>([]);

    useEffect(() => {
        GetSnappables().then((res: Snappable[]) => {
            const snappables: MentionElements[] = []
            for (let elem of res) {
                snappables.push({ id: elem.id, display: elem.fullName })
            }
            setSnappables(res)
        }).catch((e) => console.log(e))
        console.log(snappables)
    }, [loggedIn]);

    if (loggedIn) {
        return (
            <PrettyPageWrap
                navExtra={<LogoutButton setLoggedIn={setLoggedIn} />}
            >
                <SubmissionTextBox snappables={snappables} user={firebase.auth().currentUser.uid} />
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
