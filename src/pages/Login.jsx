import React, { useState } from "react";
import "../styles/login.css";
import api from "../api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("user/login", {
        username: username,
        password: password,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, role, username: l_username, profileCompleted } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", l_username);
      localStorage.setItem("profileCompleted", profileCompleted);

      if (role === "STUDENT") window.location.href = "/student-dashboard";
      else if (role === "TEACHER") window.location.href = "/teacher-dashboard";
      else if (role === "PRINCIPAL") window.location.href = "/principal-dashboard";
      else window.location.href = "/dashboard";

    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Background Image Layer */}
      <div className="login-bg-image"></div>
      
      {/* Floating Decorative Elements */}
      <div className="glass-shape shape-top"></div>
      <div className="glass-shape shape-bottom"></div>

      <div className="login-card-container">
        <div className="login-glass-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Please enter your details to access <span>EduMaster</span></p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button className="login-submit-btn" type="submit">
              Sign In
            </button>
          </form>

          <p className="signup-footer">
            New to EduMaster? <a href="/register">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}