import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ProfileOverlay from "../Profile/ProfileOverlay";

export default function Navbar() {
  let navigate = useNavigate()

 const [profileOpen, setProfileOpen] = useState(false)
 const toggleProfile = () => setProfileOpen(v => !v)

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    try {
      if (token) {
        await axios.post(
          "http://localhost:3000/users/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message)
    }
    localStorage.removeItem("token")
    navigate("/")
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1000
    })
  }

  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffbf00ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout()
      }
    })
  }

  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="navbar-container container">
        <img src="/src/assets/sowar/logo.png" className="nav-logo" alt="Logo" />
        <a className="navbar-brand fw-bold text-uppercase fs-3">Easy Home</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item"><Link className="nav-link" to="/home">HOME</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/home/property">ABOUT US</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/home/profile/appointments">CONTACT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/home/faq">WISHLIST</Link></li>
          </ul>

          <div className="navbar-icons d-flex align-items-center">

            {/* ✅ NEW PROFILE BUTTON */}
           <button
            type="button"
            className="profile-wrapper profile-btn-reset"
            onClick={toggleProfile}
            aria-label="Open profile options"
           >
            <div className="profile-box">
                <div className="profile-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>

            <button className="btn btn-outline-danger mx-2 logout-btn" onClick={handleClick}>
              Logout
            </button>

          </div>
        </div>
      </div>
      <ProfileOverlay open={profileOpen} onClose={() => setProfileOpen(false)} />
    </nav>
  )
}

