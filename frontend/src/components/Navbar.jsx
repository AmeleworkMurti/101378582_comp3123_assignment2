import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-brand">
        Amelework Murti • Assignment 02
      </div>

      <div className="nav-links">
        {!token ? (
          <>
            <Link className="nav-item" to="/login">Login</Link>
            <Link className="nav-item" to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link className="nav-item" to="/employees">Employees</Link>
            <button className="nav-logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
