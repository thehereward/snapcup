import "./app.scss";

import React, { useState, useEffect } from "react";

import PrettyPageWrap from "./components/PrettyPageWrap";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutButton from "./components/logoutButton";

import firebase from 'firebase/app';
import {getOrCreateUserProfile} from './firebase/AuthService';


const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user) {
                setUserProfile(await getOrCreateUserProfile());
                setLoggedIn(true);
            }
        })
    }, [setLoggedIn])

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
                <h1>Hi {firebase.auth().currentUser.displayName}!</h1>
            </PrettyPageWrap>
        );
    } else {
        return (
            <PrettyPageWrap>
                <LoginPage
                    setLoggedIn={setLoggedIn}
                />
            </PrettyPageWrap>
        );
    }
};

export default App;
