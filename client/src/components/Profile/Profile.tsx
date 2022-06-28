import "./Profile.css";
import axios from "axios";
import { useAuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
    const { auth, user, setAuth } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        !auth && navigate("/");
    }, [auth, navigate]);

    const logout = () => {
        axios
            .get("http://127.0.0.1:3005/users/logout", {
                withCredentials: true,
            })
            .then((res) => {
                const { logged } = res.data;
                setAuth(logged);
                navigate("/");
            });
    };

    return auth ? (
        <div className="profile">
            <button
                onClick={logout}
                type="button"
                className="logout btn btn-danger"
            >
                Выйти
            </button>
            <div>Добро пожаловать</div>
            <span className="user-name">{user.email}</span>
        </div>
    ) : null;
}
