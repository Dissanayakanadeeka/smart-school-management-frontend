import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import api from "../api";
import "../styles/Login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("user/login", { username, password });
      const { token, role, username: l_username, profileCompleted } =
        response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", l_username);
      localStorage.setItem("profileCompleted", profileCompleted);

      const dashboardPaths = {
        STUDENT: "/student-dashboard",
        TEACHER: "/teacher-dashboard",
        PRINCIPAL: "/principal-dashboard",
      };

      navigate(dashboardPaths[role] || "/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="login-bg-image" />

      <div className="login-card-container">
        <div className="login-glass-card">
          <div className="login-header">
            <div className="brand-logo">EM</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Access your <span>EduMaster</span> dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label>
                <User size={16} /> Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <label>
                <Lock size={16} /> Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && <div className="error-box">{error}</div>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="spinner" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="footer-text">
            New to EduMaster? <a href="/register">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
