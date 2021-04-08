// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { initializeDatabase } from "./firebase/InitializeDatabase";
import AppWrap from "./appWrap";

initializeDatabase();
ReactDOM.render(<AppWrap />, document.getElementById("root"));
