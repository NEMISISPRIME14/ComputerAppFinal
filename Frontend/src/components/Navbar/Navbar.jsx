import React, { useMemo, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ProfileOverlay from "../Profile/ProfileOverlay";

export default function Navbar() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleProfile = () => setProfileOpen((v) => !v);
  const toggleSearch = () => setSearchOpen((v) => !v);

  /* Replace this with your real apartments data later */
  const properties = [
    {
      id: 1,
      title: "Luxury Apartment in New Cairo",
      location: "New Cairo",
      description: "Modern apartment with pool view, balcony, and private parking.",
      price: "$150,000",
      image: "/src/assets/sowar/property1.jpg",
      recommended: true,
    },
    {
      id: 2,
      title: "Cozy Apartment in Maadi",
      location: "Maadi",
      description: "Comfortable apartment near services and restaurants.",
      price: "$95,000",
      image: "/src/assets/sowar/property2.jpg",
      recommended: false,
    },
    {
      id: 3,
      title: "Sea View Apartment in Alexandria",
      location: "Alexandria",
      description: "Beautiful sea view apartment with modern finishing.",
      price: "$180,000",
      image: "/src/assets/sowar/property3.jpg",
      recommended: true,
    },
    {
      id: 4,
      title: "Family Apartment in Nasr City",
      location: "Nasr City",
      description: "Large family apartment close to schools and shopping centers.",
      price: "$120,000",
      image: "/src/assets/sowar/property4.jpg",
      recommended: true,
    },
    {
      id: 5,
      title: "Studio Apartment in Zamalek",
      location: "Zamalek",
      description: "Small elegant studio in a premium quiet area.",
      price: "$85,000",
      image: "/src/assets/sowar/property5.jpg",
      recommended: false,
    },
  ];

  const filteredProperties = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();

    return properties
      .filter((property) => {
        return (
          property.title.toLowerCase().includes(term) ||
          property.location.toLowerCase().includes(term) ||
          property.description.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return 0;
      });
  }, [searchTerm]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          "http://localhost:3000/users/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }

    localStorage.removeItem("token");
    navigate("/");

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffbf00ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate("/real-estate", {
      state: {
        query: searchTerm,
        results: filteredProperties,
      },
    });
  };

  const handleSuggestionClick = (property) => {
    navigate("/real-estate", {
      state: {
        query: searchTerm,
        results: filteredProperties,
        selectedProperty: property,
      },
    });
  };

  const highlightText = (text, keyword) => {
    if (!keyword.trim()) return text;

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedKeyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="navbar-container container">
        <img src="/src/assets/sowar/logo.png" className="nav-logo" alt="Logo" />
        <a className="navbar-brand fw-bold text-uppercase fs-3">Easy Home</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/real-estate">
                REAL ESTATE
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/profile/appointments">
                CONTACT
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/faq">
                WISHLIST
              </Link>
            </li>
          </ul>

          <div className="navbar-icons d-flex align-items-center">
            <div className="search-wrapper">
              <form
                className={`search-container ${searchOpen ? "active" : ""}`}
                onSubmit={handleSearchSubmit}
              >
                <div
                  className="icon"
                  onClick={toggleSearch}
                  role="button"
                  tabIndex={0}
                  aria-label="Toggle search"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSearch();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Search apartments..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>

              {searchOpen && searchTerm.trim() && (
                <div className="search-dropdown">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.slice(0, 5).map((property) => (
                      <div
                        key={property.id}
                        className="search-suggestion"
                        onClick={() => handleSuggestionClick(property)}
                      >
                        <div className="search-suggestion-content">
                          <h6>
                            {highlightText(property.title, searchTerm)}
                            {property.recommended && (
                              <span className="recommended-badge">Recommended</span>
                            )}
                          </h6>
                          <p>{highlightText(property.location, searchTerm)}</p>
                          <small>
                            {highlightText(property.description, searchTerm)}
                          </small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="search-no-results">No apartments found.</div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="profile-wrapper profile-btn-reset"
              onClick={toggleProfile}
              aria-label="Open profile options"
            >
              <div className="profile-box">
                <div className="profile-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="profile-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <button
              className="btn btn-outline-danger mx-2 logout-btn"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <ProfileOverlay
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </nav>
  );
}
