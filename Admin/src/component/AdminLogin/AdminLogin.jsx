import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminAuthContext } from "../Context/AuthAdminContext";

export default function AdminLogin() {
  const { saveLoginData } = useContext(AdminAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:5000";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/loginadmin`, data, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });

      const token = response?.data?.token;
      if (!token) {
        toast.error("Login succeeded but token missing from server response.");
        return;
      }

      localStorage.setItem("token", token);
      saveLoginData();
      navigate("/admin", { replace: true });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed in successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        (status
          ? `Server error (${status})`
          : "Cannot reach server (backend down / CORS / wrong URL)");

      console.log("LOGIN ERROR:", {
        message: error.message,
        status,
        data: error?.response?.data,
      });

      toast.error(message, {
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
      navigate("/admin", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="row w-100">
        <div className="col-md-6 col-10 bg-light mx-auto p-4 rounded-4">
          <h3 className="text-center text-uppercase fw-bold h1 mb-5">Login</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="adminEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="adminEmail"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="adminPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="adminPassword"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-warning text-uppercase text-white fw-bold fs-5 my-3 w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "LogIn"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}