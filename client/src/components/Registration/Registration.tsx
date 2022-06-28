import "./Registration.css";
import axios from "axios";
import { useAuthContext } from "../../AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const { auth, setAuth, setUser } = useAuthContext();

    const [userData, setUserData] = useState({ email: "", password: "" });
    const [warn, setWarn] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        auth && navigate("/profile");
    }, [auth, navigate]);

    const registration = () => {
        const { email, password } = userData;
        if (email && password) {
            axios
                .post("http://127.0.0.1:3005/users/registration", userData, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.status === 200) {
                        const { logged, user } = res.data;
                        setAuth(logged);
                        setUser(user);
                        setWarn("");
                        navigate("/profile");
                    }
                })
                .catch((err) => setWarn(err.response.data.error_message));
        } else {
            setWarn("Поля не заполнены!");
        }
    };

    return (
        <div className="registration">
            <form className="form">
                <div className="title">Регистрация</div>
                <button
                    onClick={() => navigate(-1)}
                    className="back btn btn-primary"
                    type="button"
                >
                    Назад
                </button>
                <div className="entry-field mb-3">
                    <label className="form-label">Логин</label>
                    <input
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                        className="form-control"
                        name="email"
                        type="email"
                    />
                </div>
                <div className="entry-field mb-3">
                    <label className="form-label">Пароль</label>
                    <input
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                        value={userData.password}
                        className="form-control"
                        name="password"
                        type="password"
                    />
                </div>
                {warn && <div className="warn">{warn}</div>}
                <button
                    onClick={registration}
                    className="registration btn btn-success"
                    type="button"
                >
                    Регистрация
                </button>
            </form>
        </div>
    );
}
