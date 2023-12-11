import axios from "axios";
import config from "../../config";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import moment from "moment";
const API_URL = config["API_URL"];

export const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(location.state);
    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(1);
    const [rerender, setRerender] = useState(true);
    const [status, setStatus] = useState("Working");
    const [statusFilter, setStatusFilter] = useState("");
    // const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const tableRef = useRef(null);
    useEffect(() => {
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
        // console.log("In socket effect");
        const socket = new WebSocket("ws://localhost:3001");
        // console.log(socket);
        // Event handler for when the connection is open
        socket.addEventListener("open", (event) => {
            console.log("Connected to WebSocket server");
        });
        // Event handler for when a message is received
        socket.addEventListener("message", async (event) => {
            if (event?.data) {
                const userDataUpdate = await JSON.parse(event.data);
                setUsersList((prev) => {
                    return prev.map((user) => {
                        return user._id === userDataUpdate._id
                            ? {
                                  ...user,
                                  status: userDataUpdate.status,
                                  ts: moment(userDataUpdate.ts).format("HH:mm:ss DD-MM-YYYY"),
                              }
                            : user;
                    });
                });
            }
        });
        // Event handler for when the connection is closed
        socket.addEventListener("close", (event) => {
            console.log("Connection to WebSocket server closed");
        });
        // Cleanup WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);
    useEffect(() => {
        loadUsersList();
    }, [page, rerender]);
    useEffect(() => {
        setPage(1);
        setRerender(!rerender);
    }, [statusFilter]);
    const loadUsersList = async () => {
        console.log("loading users", page, statusFilter);
        try {
            let args = "?page=" + page;
            if (statusFilter) {
                args = args + "&status=" + statusFilter;
            }
            const data = await axios.get(`${API_URL}/users${args}`);
            if (data) {
                console.log(data.data.users);
                const list = data.data.users.map((user) => {
                    return { ...user, ts: moment(user.ts).format("HH:mm:ss DD-MM-YYYY") };
                });
                if (page === 1) {
                    setUsersList(list);
                } else {
                    setUsersList((prevList) => {
                        return prevList.concat(list);
                    });
                }
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
    const updateStatus = async () => {
        try {
            const id = user._id;
            const res = await axios.post(`${API_URL}/status/${id}`, { status: status });
            console.log(res.data);
            if (res.status === 200) {
                setUser(res.data);
            } else {
                setMessage(res.data.message);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }
    };
    const handleScroll = (e) => {
        const tableElement = tableRef.current;
        const isAtBottom =
            e.scrollTop + tableElement?.props?.height >
            tableElement?.props?.data?.length * tableElement?.props?.rowHeight;
        // Check if the user has scrolled to the bottom
        if (isAtBottom) {
            setPage(page + 1);
            // console.log("hit bottom");
        }
    };

    return (
        <div className="container mt-3">
            <div className="text-start">
                <h5>My Status:</h5>
            </div>
            <div className="d-flex">
                <div className="col-6">
                    <p className="text-start">Name: {user?.userName}</p>
                    <p className="text-start">Status: {user?.status}</p>
                    <p className="text-start">
                        Changed: {moment(user?.ts).format("HH:mm:ss DD-MM-YYYY")}
                    </p>
                </div>
                <div className="col-6 d-flex flex-column">
                    <select
                        className="form-select mb-3 mt-3"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                        }}>
                        <option value="Working">Working</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Sickness">Sickness</option>
                    </select>
                    <button
                        className="btn btn-primary ml-auto"
                        onClick={() => {
                            updateStatus();
                        }}
                        disabled={user?.status === status}
                        title={
                            user?.status === status
                                ? "can't change to you current status"
                                : "change your status to " + status
                        }>
                        Update My Status
                    </button>
                </div>
            </div>
            <div className="">{message}</div>
            <hr />
            <div className="row justify-content-evenly mb-3 mt-t">
                <h5 className="col">All user Statuses:</h5>
                <select
                    className="col form-select"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                    }}>
                    <option value="">All</option>
                    <option value="Working">Working</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Sickness">Sickness</option>
                </select>
                {/* <input
                    type="text"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    value={search}
                    className="col"
                />
                <button onClick={() => {}} className="col-1 btn btn-primary">
                    Find
                </button> */}
            </div>
            <div className="d-flex justify-content-center">
                <BaseTable
                    data={usersList}
                    width={600}
                    height={470}
                    ref={tableRef}
                    onScroll={(e) => handleScroll(e)}>
                    <Column
                        key="0"
                        dataKey="userName"
                        width={200}
                        title="Name"
                        align="center"
                        className="border border-1"
                        headerClassName="border border-2"
                    />
                    <Column
                        key="1"
                        dataKey="status"
                        width={200}
                        title="Status"
                        align="center"
                        className="border border-1"
                        headerClassName="border border-2"
                    />
                    <Column
                        key="2"
                        dataKey="ts"
                        width={200}
                        title="Last Updated"
                        align="center"
                        className="border border-1"
                        headerClassName="border border-2"
                    />
                </BaseTable>
            </div>
        </div>
    );
};
