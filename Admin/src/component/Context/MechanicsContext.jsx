import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export let MechanicsContext = createContext(null);

export default function MechanicsContextProvider(props) {
    let [MechanicsData, setMechanicsData] = useState(null)
    const getMechanics = async () => {
        try {
            let response = await axios.get('http://localhost:3000/mechanics');
            setMechanicsData(response.data);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getMechanics()
    }, [])
    return (
        <MechanicsContext.Provider value={{ MechanicsData, setMechanicsData, getMechanics }}>
            {props.children}
        </MechanicsContext.Provider>
    )
}