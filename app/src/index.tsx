// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { initializeDatabase } from "./firebase/InitializeDatabase";
import App from "./app";

initializeDatabase();
ReactDOM.render(<App />, document.getElementById("root"));
