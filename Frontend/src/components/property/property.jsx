import { useState, useEffect, useRef, useCallback } from "react";
import "./Property.css";

/* ===== IMPORT FROM src/assets/sowar ===== */

import background from "../../assets/sowar/background.png";

import slide1 from "../../assets/sowar/slide1.png";
import slide2 from "../../assets/sowar/slide2.png";
import slide3 from "../../assets/sowar/slide3.png";
import slide4 from "../../assets/sowar/slide4.png";

import logo from "../../assets/sowar/logo.png";
import logoCircle from "../../assets/sowar/logo-circle.png";

import iconCall from "../../assets/sowar/icon-call.png";
import iconWhatsapp from "../../assets/sowar/icon-whatsapp.png";
import iconMaps from "../../assets/sowar/icon-maps.png";

/* ===== SLIDES ARRAY ===== */

const slides = [slide1, slide2, slide3, slide4];
const labels = ["LIVING ROOM", "LOUNGE AREA", "MASTER BEDROOM", "KITCHEN"];

export default function Property() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const timer = useRef(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (hover) return;
    timer.current = setInterval(next, 4000);
    return () => clearInterval(timer.current);
  }, [hover, next]);

  return (
    <div className="pageStage">
      <section className="property">
        <img src={background} className="property-bg" alt="" />

        {/* NAVBAR */}
        {/* <div className="nav">
          <img src={logo} className="nav-logo" alt="Logo" />
          <div className="nav-links">
            <button>HOME</button>
            <button>ABOUT US</button>
            <button>CONTACT</button>
            <button>WISHLIST</button>
          </div>
          <div className="nav-avatar" />
        </div> */}

        {/* SLIDER */}
        <div
          className="slider"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="side">
            <img
              src={slides[(index - 1 + slides.length) % slides.length]}
              alt=""
            />
          </div>

          <div className="main">
            <img src={slides[index]} alt="" />
            <div className="tag">{labels[index]}</div>

            <div className="dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? "active" : ""}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          <div className="side">
            <img src={slides[(index + 1) % slides.length]} alt="" />
          </div>

          <button className="arrow left" onClick={prev}>
            ‹
          </button>
          <button className="arrow right" onClick={next}>
            ›
          </button>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom">
          {/* LEFT */}
          <div className="card">
            <div className="card-top">
              <img src={logoCircle} className="circle" alt="" />
              <div>
                <h2>EAST VALE IN NASR CITY</h2>
                <p className="muted">starting price</p>
                <h3>8,000,000 EGP</h3>
              </div>
            </div>

            <div className="icons">
              <button aria-label="call">
                <img src={iconCall} alt="" />
              </button>
              <button aria-label="whatsapp">
                <img src={iconWhatsapp} alt="" />
              </button>
              <button aria-label="maps">
                <img src={iconMaps} alt="" />
              </button>
            </div>

            <div className="btnRow">
              <button className="primary">MAKE A CONTRACT</button>
              <button className="secondary">
                WISHLIST <span className="heart">♡</span>
              </button>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="details">
            <h3>DETAILS</h3>
            <ul>
              <li>Nasr City, Cairo, Egypt</li>
              <li>250 – 500 m² units</li>
              <li>3 – 5 Bedrooms</li>
              <li>Delivery: Q4 2026</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="desc">
            <p>
              East Vale is an exclusive residential compound located in the heart
              of Nasr City, Cairo. Designed with a vision of modern luxury, each
              unit features open-plan living spaces, premium finishes, and
              panoramic views of the city skyline.
            </p>

            <div className="stats">
              <div>
                <strong>1990</strong>
                <span>FOUNDED</span>
              </div>
              <div>
                <strong>2000</strong>
                <span>ESTABLISHED</span>
              </div>
              <div>
                <strong>CEO</strong>
                <span>ROLE</span>
              </div>
              <div className="toggle" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}