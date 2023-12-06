import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
const API_URL = config["API_URL"];

export const Main = () => {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(1);
    const tableRef = useRef(null);
    useEffect(() => {
        // console.log(Date.now());
        // async function checkAuth() {
        //     try {
        //         const res = await axios.post(`${API_URL}/isAuth`);
        //         console.log(res);
        //         if (res.status !== 200) {
        //             console.log(res);
        //             // navigate("/");
        //         } else {
        //             console.log(res);
        //         }
        //     } catch (err) {
        //         console.log(err);
        //         // navigate("/");
        //     }
        // }
        // checkAuth();
    }, []);
    useEffect(() => {
        loadUsersList();
    }, [page]);
    const loadUsersList = async () => {
        try {
            const data = await axios.get(`${API_URL}/users?page=${page}`);
            if (data) {
                setUsersList((prevList) => {
                    return prevList.concat(data.data.users);
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    // const sendLogout = async () => {
    //     const res = await axios.post(`${API_URL}/logout`);
    //     console.log(res);
    //     if (res.status === 200) {
    //         // setMessage(res.data.message);
    //         navigate("/");
    //     } else {
    //         // setMessage(res.data.message);
    //     }
    // };

    const handleScroll = (e) => {
        const tableElement = tableRef.current;
        const isAtBottom =
            e.scrollTop + tableElement.props.height >
            tableElement.props.data.length * tableElement.props.rowHeight;

        // console.log(tableElement.props.data.length * tableElement.props.rowHeight);
        // console.log(e.scrollTop + tableElement.props.height);
        // console.log(isAtBottom);
        // Check if the user has scrolled to the bottom

        if (isAtBottom) {
            setPage(page + 1);
            console.log("hit bottom");
        }
    };

    return (
        <div className="App-header">
            <div className="row">
                <h4>Status:</h4>
                <select></select>
            </div>
            <hr />
            <BaseTable
                data={usersList}
                width={600}
                height={600}
                ref={tableRef}
                onScroll={(e) => handleScroll(e)}>
                <Column key="col0" dataKey="userName" width={200} title="Name" align="center" />
                <Column key="col1" dataKey="status" width={200} title="Status" align="center" />
                <Column key="col2" dataKey="ts" width={200} title="Last Updated" align="center" />
            </BaseTable>
        </div>
    );
};
