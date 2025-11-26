import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/employees" className="brand">AmeleworkMurti-assignment02</Link>
      </div>
      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/employees">Employees</Link>
            <button className="btn-link" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
