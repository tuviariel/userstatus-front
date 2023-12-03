import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
const API_URL = config["API_URL"];

export const Main = () => {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        console.log("in effect");
        async function checkAuth() {
            try {
                const res = await axios.post(`${API_URL}/isAuth`);
                console.log(res);
                if (res.status !== 200) {
                    console.log(res);
                    // navigate("/");
                } else {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
                // navigate("/");
            }
        }
        checkAuth();
    }, []);
    useEffect(() => {
        loadUsersList();
    }, []);
    const loadUsersList = async () => {
        // const data = await axios.get(`${API_URL}/users`);
        // data && setUsersList(data);
    };
    const sendLogout = async () => {
        const res = await axios.post(`${API_URL}/logout`);
        console.log(res);
        if (res.status === 200) {
            // setMessage(res.data.message);
            navigate("/");
        } else {
            // setMessage(res.data.message);
        }
    };
    return (
        <div className="App-header">
            <h5
                onClick={() => {
                    sendLogout();
                }}>
                Log Out
            </h5>
            <div className="row">
                <h4>Status</h4>
                <select></select>
            </div>
            <hr />
        </div>
    );
};
