import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router";
const API_URL = config["API_URL"];
export const Welcome = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        // console.log("in effect");
        // async function checkAuth() {
        //     try {
        //         const res = await axios.post(`${API_URL}/isAuth`);
        //         console.log(res);
        //         if (res.status === 200) {
        //             // navigate("/main");
        //         } else {
        //             console.log(res.status);
        //         }
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // checkAuth();
    }, []);
    const sendRegister = async () => {
        const res = await axios.post(`${API_URL}/register`, {
            userName: userName,
            password: password,
        });
        console.log(res);
        if (res.status === 200) {
            navigate("/main");
            setMessage(res.data.message);
        } else {
            setMessage(res.data.message);
        }
    };
    const sendLogin = async () => {
        const res = await axios.post(`${API_URL}/login`, {
            userName: userName,
            password: password,
        });
        console.log(res.data.user);
        if (res.status === 200) {
            setMessage(res.data.message);
            navigate("/main", { state: res.data.user });
        } else {
            setMessage(res.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <p className="display-6">Welcome</p>
            <h3 className="text-decoration-underline">{login ? "Login" : "Register"}</h3>
            <br />
            <div className="row justify-content-center">
                <input
                    className="form-control col-5 mb-3"
                    type="text"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                    value={userName}
                    placeholder="Enter your name..."
                />
            </div>
            <div className="row justify-content-center">
                <input
                    className="form-control col-5 mb-3"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    placeholder="Enter your password..."
                />
            </div>
            <div className="row justify-content-center">
                {!login && (
                    <input
                        className="form-control col-5 mb-3"
                        type="password"
                        onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                        }}
                        value={passwordConfirm}
                        placeholder="Confirm your password..."
                    />
                )}
            </div>
            <div className="row justify-content-center">
                {login ? (
                    <button
                        className="btn btn-primary col-4 mb-4"
                        disabled={userName === "" || password === ""}
                        title={
                            userName === ""
                                ? "You must type in your name"
                                : password === ""
                                ? "You must choose a password"
                                : "Login"
                        }
                        onClick={() => {
                            sendLogin();
                        }}>
                        Log In
                    </button>
                ) : (
                    <button
                        className="btn btn-primary col-4 mb-4"
                        disabled={
                            userName === "" ||
                            password === "" ||
                            passwordConfirm === "" ||
                            password !== passwordConfirm
                        }
                        title={
                            userName === ""
                                ? "You must type in you name"
                                : password === ""
                                ? "You must choose a password"
                                : passwordConfirm === ""
                                ? "You must confirm your password"
                                : password !== passwordConfirm
                                ? "Password is not confirmed properly"
                                : "Register"
                        }
                        onClick={() => {
                            sendRegister();
                        }}>
                        Sign Up
                    </button>
                )}
                <h6>
                    {login ? "Haven't registered yet?... " : "All ready registered?... "}
                    <a
                        role="button"
                        className="text-decoration-underline"
                        onClick={() => {
                            setLogin((login) => {
                                return !login;
                            });
                            setMessage("");
                        }}>
                        {login ? " Register" : " Login"}
                    </a>
                    .
                </h6>
            </div>
            <div>{message}</div>
        </div>
    );
};
