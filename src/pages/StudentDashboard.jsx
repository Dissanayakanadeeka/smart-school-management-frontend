import React,{ useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import StudentSubjects from "../components/StudentSubjects";
import "../styles/studentDashboard.css"; 
import api from "../api";

export default function PrincipalDashboard() {
    const username = localStorage.getItem("username");
    const navigate=useNavigate();
    const [profileCompleted, setProfileCompleted] = useState(true);


  useEffect(() => {
    const flag = localStorage.getItem("profileCompleted") === "true";
    setProfileCompleted(flag);
  }, []);
  useEffect(() => {
    api
      .get("/students/status")
      .then((res) => {
        localStorage.setItem("classId", res.data.classId);
      })
      .catch((err) => {
        console.error("Failed to fetch student status", err);
      });
  }, []);
  
    if (!profileCompleted) {
    return (
      <div className="registration-overlay">
        <div className="registration-card">
          <h1>Complete Registration</h1>
          <p>You haven't finished setting up your student profile. Please complete this to access your learning materials.</p>
          <button className="complete-btn" onClick={() => navigate("/register")}>
            Complete Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar - Purely Visual for Layout */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">EDUMASTER</div>
        <nav className="sidebar-nav">
          <div className="nav-item active">Dashboard</div>
          <div
            className="nav-item"
            onClick={() => navigate("/student/courses")}
            style={{ cursor: "pointer" }}
          >
            My Courses
          </div>
          <div className="nav-item">Assignments</div>
          <div className="nav-item">Grades</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <input type="text" placeholder="Search for subjects or resources..." />
          </div>
          <div className="user-profile">
            <span className="welcome-text">Welcome back, <strong>{username}!</strong></span>
            <div className="avatar-circle">{username?.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <section className="dashboard-content">
          <div className="content-header">
            <h2>Your Learning Progress</h2>
            <p>Continue where you left off today.</p>
          </div>
          
        </section>
      </main>
    </div>
  );
}

