<<<<<<< HEAD
import firebase from 'firebase/app';
import React = require("react");
=======
import './app.scss';

import React, {useState} from "react";
>>>>>>> upstream/main
import AuthService from "./firebase/AuthService";
import PrettyPageWrap from './components/PrettyPageWrap';
import LoginPage from './components/loginPage/LoginPage';

const authService = new AuthService();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    if(loggedIn){
        return <h1>Woo logged in!!!</h1>
    } else {
        return <PrettyPageWrap><LoginPage authService={authService} /></PrettyPageWrap>
    }
}

export default App;