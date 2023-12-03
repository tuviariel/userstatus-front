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
    const [rerender, setRerender] = useState(false);
    useEffect(() => {
        console.log("in effect");
        async function checkAuth() {
            try {
                const res = await axios.post(`${API_URL}/isAuth`);
                console.log(res);
                if (res.status === 200) {
                    // navigate("/main");
                } else {
                    console.log(res.status);
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, [rerender]);
    const sendRegister = async () => {
        const res = await axios.post(`${API_URL}/register`, {
            userName: userName,
            password: password,
        });
        console.log(res);
        if (res.status === 200) {
            // navigate("/main");
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
        console.log(res);
        if (res.status === 200) {
            setMessage(res.data.message);
            // navigate("/main");
        } else {
            setMessage(res.data.message);
        }
    };

    return (
        <div className="App-header">
            <h2
                className=""
                onClick={() => {
                    setRerender(!rerender);
                }}>
                Welcome
            </h2>
            <h3>{login ? "Login" : "Register"}</h3>
            <h5>
                {login ? "Haven't registered yet" : "All ready registered"}?...
                <span
                    className=""
                    onClick={() => {
                        setLogin((login) => {
                            return !login;
                        });
                        setMessage("");
                    }}>
                    {login ? " Register" : " Login"}
                </span>
                .
            </h5>
            <input
                type="text"
                onChange={(e) => {
                    setUserName(e.target.value);
                }}
                value={userName}
                placeholder="Enter your name..."
            />
            <input
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                value={password}
                placeholder="Enter your password..."
            />
            {!login && (
                <input
                    type="password"
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                    }}
                    value={passwordConfirm}
                    placeholder="Confirm your password..."
                />
            )}
            {login ? (
                <button
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
            <div>{message}</div>
        </div>
    );
};
