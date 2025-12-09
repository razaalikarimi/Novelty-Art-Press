import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });
      login(res.data.token, res.data.user);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="page-container narrow">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="simple-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn-primary" type="submit">
          Login
        </button>
        {error && <p className="form-status error">{error}</p>}
      </form>
      <p className="small-text">
        Tip: Use the seed admin API once to create an admin user.
      </p>
    </div>
  );
};

export default AdminLoginPage;
