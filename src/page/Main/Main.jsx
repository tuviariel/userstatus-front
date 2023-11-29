import axios from "axios";
import config from "../../config";
import { useEffect, useState } from "react";
const API_URL = config["API_URL"];

export const Main = () => {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        loadUsersList();
    }, []);
    const loadUsersList = async () => {
        // const data = await axios.get(`${API_URL}/users`);
        // data && setUsersList(data);
    };
    return (
        <div className="App-header">
            <div className="row">
                <h4>Status</h4>
                <select></select>
            </div>
            <hr />
        </div>
    );
};
