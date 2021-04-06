import React from 'react';
import AuthService from '~firebase/AuthService';

interface Props {
    authService: AuthService
}

const LoginPage:React.FunctionalComponent<Props> = ({authService}) => {
    return <div className="text-center p-5">
        <h1>🥤 Welcome to SnapCup!</h1>
        <p className="m-5 h3">Share those warm fuzzies here!</p>
        <button onClick={() => authService.signIn()} className="btn btn-primary">Login</button>
    </div>
}

export default LoginPage;

