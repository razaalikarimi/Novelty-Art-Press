// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      {/* LEFT: Logo + Brand name */}
      <div className="navbar-brand">
        <Link to="/" className="brand-logo">
          {/* 👇 apni image /public folder me logo.png naam se rakho */}
          <img src="/logoN.png" alt="Novelty Art Press" className="nav-logo" />
          <span>Novelty Art Press</span>
        </Link>
      </div>

      {/* RIGHT: Nav links */}
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/blog">Portfolio</Link>

        {user ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <button className="btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/login">Admin</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
