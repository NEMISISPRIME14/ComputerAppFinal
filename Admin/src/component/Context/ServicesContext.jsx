import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export let ServicesContext = createContext(null);
export default function ServicesContextProvider(props) {
    let [ServicesData, setServicesData] = useState(null)
    const getServices = async () => {
        try {
            let response = await axios.get('http://localhost:3000/services');
            setServicesData(response.data);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getServices()
    }, [])
    return (
        <ServicesContext.Provider value={{ ServicesData, setServicesData , getServices }}>
            {props.children}
        </ServicesContext.Provider>
    )
}