// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { initializeDatabase } from "./firebase/FirestoreService";
import App from "./app"
import SubmissionTextBox from "./components/submissionPage/SubmissionTextBox";

initializeDatabase();
ReactDOM.render((
  <React.StrictMode>
    <SubmissionTextBox />
  </React.StrictMode>
), document.getElementById("root"));
