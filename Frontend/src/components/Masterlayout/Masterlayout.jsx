import React, { use, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Aos from 'aos'

export default function Masterlayout() {
  let { LoginData, saveLoginData } = useContext(AuthContext)
  let navigate = useNavigate()
  let [visible, setVisible] = useState(false)
  const handleVisible = () => {
    const scroll = window.pageYOffset;
    if (scroll > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    Aos.init()
    Aos.refresh()
    handleVisible()
    window.addEventListener('scroll', handleVisible)
    return () => {
      window.removeEventListener('scroll', handleVisible)
    }
  }, [])
  useEffect(() => {
    if (LoginData) {
      document.title = `${LoginData?.name}`
    }
  }, [LoginData])
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }); };
  return (
    <>
      <div className="masterlayout" data-aos="fade-down" data-aos-duration="1000">
        <Navbar />
        <div className="container-fluid overflow-hidden">
          <Outlet />
        </div>
        <Footer />
      </div>
      <button className={`btn btn-dark fs-3 scroll-btn ${visible ? 'show' : 'hide'}`} onClick={scrollToTop}>
        <i className="fa fa-arrow-up scroll-to-top" ></i>
      </button>

    </>
  )
}
