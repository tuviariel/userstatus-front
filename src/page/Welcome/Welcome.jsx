import { useState } from "react";
import axios from "axios";
import config from "../../config";
const API_URL = config["API_URL"];
export const Welcome = () => {
    const [login, setLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const sendRegister = () => {
        axios.post(`${API_URL}/login`, { userName: userName, password: password }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                //navigate to main page
                setMessage(res.data.message);
            } else {
                setMessage(res.data.message);
            }
        });
    };
    const sendLogin = () => {
        setMessage("in send login");
    };
    return (
        <div className="App-header">
            <h2
                onClick={() => {
                    setLogin(!login);
                    setMessage("");
                }}
                className="">
                Welcome
            </h2>
            <h3>{login ? "Login" : "Register"}</h3>
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
