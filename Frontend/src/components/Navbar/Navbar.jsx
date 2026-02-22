import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
export default function Navbar() {
  let navigate = useNavigate()
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await axios.post(
          "http://localhost:3000/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }
    localStorage.removeItem("token");
    navigate("/");
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1000
    });
  };
  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffbf00ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          handleLogout()
        }
      })
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="navbar-container container ">
          <a className="navbar-brand fw-bold text-uppercase fs-3">Easy Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/home'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/home/services'}>Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/home/profile/appointments'}>Appointments</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/home/faq'}>FAQ ?</Link>
              </li>
            </ul>
            <div className="navbar-icons d-flex align-items-center">
              <Link className='nav-icon i-car' to={'/home/usercars'}><i className='fa fa-car'></i></Link>
              <Link className='nav-icon i-profile' to={'/home/profile'}><i className="fa fa-user"></i></Link>
              <Link className='btn btn-outline-danger mx-2 logout-btn' onClick={handleClick}>Logout</Link>
            </div>
          </div>

        </div>
      </nav>
    </>
  )
}
