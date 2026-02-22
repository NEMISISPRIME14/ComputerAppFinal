import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UserCars() {
   
    return (
        <>
        <Outlet />
        </>
    )
}
