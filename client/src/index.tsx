import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import AuthContextProvider from "./AuthContext/AuthContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);
