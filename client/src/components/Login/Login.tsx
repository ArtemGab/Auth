import "./Login.css";
import axios from "axios";
import { useAuthContext } from "../../AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { auth, setAuth, setUser } = useAuthContext();

    const [userData, setUserData] = useState({ email: "", password: "" });
    const [warn, setWarn] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        auth && navigate("/profile");
    }, [auth, navigate]);

    const login = () => {
        const { email, password } = userData;
        if (email && password) {
            axios
                .post("http://127.0.0.1:3005/users/login", userData, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
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
        <div className="login">
            <form className="form">
                <div className="title">Вход</div>
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

                <div className="buttons-group">
                    <button
                        onClick={login}
                        className="btn btn-primary"
                        type="button"
                    >
                        Войти
                    </button>
                    <button
                        onClick={() => navigate("/registration")}
                        className="btn btn-success"
                        type="button"
                    >
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
}
