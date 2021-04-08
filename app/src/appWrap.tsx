/*
 * A component for global, unchanging tags needed later.
 */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import App from "./app";

const GlobalStyle = createGlobalStyle`
body {
    background: linear-gradient(240.3deg, rgba(58, 9, 161, 0.4) -17.93%, rgba(196, 196, 196, 0) 100.75%);
    min-height: 100vh;
}
`;

const AppWrap = () => (
    <Router>
        <GlobalStyle />
        <App />
    </Router>
);

export default AppWrap;
