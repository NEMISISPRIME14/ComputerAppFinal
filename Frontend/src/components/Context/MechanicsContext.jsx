import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MechanicsContext = createContext(null);
export default function MechanicsContextProvider(props) {
    let [mechanics, setMechanics] = useState([])
    let getMechanics = async () => {
        try {
            let response = await axios.get('http://localhost:3000/mechanics');
            setMechanics(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMechanics()
    }, [])
    return (
        <MechanicsContext.Provider value={{mechanics}}>
            {props.children}
        </MechanicsContext.Provider>
    )
}