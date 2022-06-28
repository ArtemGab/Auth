import "./App.css";
import axios from "axios";
import { useAuthContext } from "../../AuthContext/AuthContext";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Profile from "../Profile/Profile";
import Absence from "../Absence/Absence";

function App() {
    const { setAuth, setUser } = useAuthContext();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:3005/users/login", { withCredentials: true })
            .then((res) => {
                const { logged, user } = res.data;
                setAuth(logged);
                setUser(user);
            });
    }, [setAuth, setUser]);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Absence />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default React.memo(App);
