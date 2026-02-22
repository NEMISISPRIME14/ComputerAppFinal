import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'


export let ServicesContext = createContext(null);
export default function ServicesContextProvider(props) {
    let [services, setServices] = useState([])
    let [slicedServices, setSlicedServices] = useState([])
    let getServices = async () => {
        try {
            let response = await axios.get('http://localhost:3000/services');
            setServices(response.data);
            setSlicedServices(response.data.slice(0, 3));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getServices()
    }, [])
    return (
        <ServicesContext.Provider value={{services, slicedServices}}>
            {props.children}
        </ServicesContext.Provider>
    )
}