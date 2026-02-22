import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UsersContext = createContext(null);
export default function UsersContextProvider(props) {
    let [UsersData, setUsersData] = useState(null)

    const getUsers = async () => {
        try {
            let response = await axios.get('http://localhost:3000/users');
            setUsersData(response.data);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <UsersContext.Provider value={{ UsersData, setUsersData,getUsers }}>
            {props.children}
        </UsersContext.Provider>
    )
}