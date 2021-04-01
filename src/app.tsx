import firebase from 'firebase/app';
import React from "react";
import AuthService from "./firebase/AuthService";

const firebaseAuth = new AuthService();

const App = () => (
    <h1>
        Hello world!
        <button onClick={() => firebaseAuth.signIn()}>
            Sign In!
        </button>
    </h1>
)

export default App;