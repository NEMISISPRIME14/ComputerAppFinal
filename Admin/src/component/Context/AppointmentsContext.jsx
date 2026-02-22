import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";


export let AppointmentsContext = createContext(null);
export default function AppointmentsContextProvider(props) {
    let [AppointmentsData, setAppointmentsData] = useState(null)
    const getAppointments = async () => {
        try {
            let response = await axios.get('http://localhost:3000/appointments');
            setAppointmentsData(await response.data);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getAppointments()
    }, [])
    return (
        <AppointmentsContext.Provider value={{ AppointmentsData, setAppointmentsData ,getAppointments}}>
            {props.children}
        </AppointmentsContext.Provider>
    )
}