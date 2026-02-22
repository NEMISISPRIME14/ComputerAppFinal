import { createContext, useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


export let AdminAuthContext  = createContext(null);
export default function AdminAuthContextProvider(props) {
    let [LoginData, setLoginData] = useState(null)
    const saveLoginData = () => {
        let encodedToken = localStorage.getItem('token')
        let decodedToken = jwtDecode(encodedToken)
        setLoginData(decodedToken)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveLoginData()
        }
    }, [])
    return (
        <AdminAuthContext.Provider value={{LoginData, saveLoginData, setLoginData}}>
            {props.children}
        </AdminAuthContext.Provider>
    )
}