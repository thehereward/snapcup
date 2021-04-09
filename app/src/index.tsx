// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { initializeDatabase } from "./firebase/InitializeDatabase";
import AppWrap from "./appWrap";
import Popup from "react-popup";

initializeDatabase();
ReactDOM.render(<AppWrap />, document.getElementById("root"));
