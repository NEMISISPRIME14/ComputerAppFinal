import { createContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export let MessagesContext = createContext(null);
export default function MessagesContextProvider(props) {
    let [MessagesData, setMessagesData] = useState([])
    const getMessages = async () => {
        try {
            let response = await axios.get('http://localhost:3000/messages');
            setMessagesData(response.data);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getMessages()
    }, [])
    return (
        <MessagesContext.Provider value={{ MessagesData, setMessagesData , getMessages}}>
            {props.children}
        </MessagesContext.Provider>
    )
}