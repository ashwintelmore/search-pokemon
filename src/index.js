
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BookmarkProvider } from "./Provider/Pokemon";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BookmarkProvider>
    <App />
  </BookmarkProvider>
  // </React.StrictMode>
);

