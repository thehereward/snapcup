// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { initializeDatabase } from "./firebase/FirestoreService";
import App from "./app"

initializeDatabase();
ReactDOM.render((
  <React.StrictMode>
    <App />
  </React.StrictMode>
), document.getElementById("root"));
