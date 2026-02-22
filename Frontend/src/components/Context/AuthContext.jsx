import { createContext, useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


export let AuthContext = createContext(null);
export default function AuthContextProvider(props) {
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
        <AuthContext.Provider value={{LoginData, saveLoginData, setLoginData}}>
            {props.children}
        </AuthContext.Provider>
    )
}