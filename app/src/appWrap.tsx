import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";

const AppWrap = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrap;
