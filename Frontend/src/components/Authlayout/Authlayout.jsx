import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

export default function Authlayout() {
    let { saveLoginData } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveLoginData();
            navigate("/home");
        }
    }, []);
    return (
        <>
            <div className="authcontainer">
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
