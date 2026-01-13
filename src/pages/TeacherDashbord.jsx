import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  UserCircle, 
  ClipboardCheck, 
  ArrowRight 
} from "lucide-react";
import api from "../api";
import "../styles/teacherDashboard.css";

export default function TeacherDashboard() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [profileCompleted, setProfileCompleted] = useState(true);
  const [hasClass, setHasClass] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const flag = localStorage.getItem("profileCompleted") === "true";
    setProfileCompleted(flag);

    api.get("/teachers/class-status")
      .then((res) => {
        setHasClass(res.data.hasClass);
        localStorage.setItem("classId", res.data.classId || "");
      })
      .catch((err) => {
        console.error("Failed to load class status", err);
        setHasClass(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!profileCompleted) {
    return (
      <div className="registration-overlay">
        <div className="registration-card">
          <UserCircle size={48} color="#2563eb" />
          <h1>Complete Registration</h1>
          <p>Please finish your teacher profile setup to access your classes and subjects.</p>
          <button className="primary-btn" onClick={() => navigate("/register")}>
            Complete Now
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loader">Loading your workspace...</div>;

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">EDUMASTER</div>
        <nav className="sidebar-nav">
          <div className="nav-item active"><LayoutDashboard size={18} /> Dashboard</div>
          <div className="nav-item" onClick={() => navigate("/teacher/my-subjects")}><BookOpen size={18} /> My Subjects</div>
          {hasClass && (
            <div className="nav-item" onClick={() => navigate("/teacher/my-class")}><Users size={18} /> My Class</div>
          )}
          <div className="nav-item"><ClipboardCheck size={18} /> Attendance</div>
          <div className="nav-item"><Settings size={18} /> Profile Settings</div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1>Teacher Dashboard</h1>
            <p>Welcome back, <strong>{username}!</strong></p>
          </div>
          <div className="header-profile">
            <div className="avatar">{username?.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <section className="dashboard-content">
          {/* STAT CARDS */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <BookOpen size={24} />
              <div className="stat-info">
                <h3>My Subjects</h3>
                <p>Manage courses</p>
              </div>
            </div>
            <div className="stat-card purple">
              <ClipboardCheck size={24} />
              <div className="stat-info">
                <h3>Assignments</h3>
                <p>Pending grading</p>
              </div>
            </div>
          </div>

          {/* ACTION SECTION */}
          <div className="action-section">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              
              <div className="action-card" onClick={() => navigate("/teacher/my-subjects")}>
                <h3>View Assigned Subjects</h3>
                <p>Access lecture materials and student assignments for your courses.</p>
                <span className="action-link">Open Subjects <ArrowRight size={16} /></span>
              </div>

              {hasClass && (
                <>
                  <div className="action-card" onClick={() => navigate("/teacher/my-class")}>
                    <h3>Class Management</h3>
                    <p>View student list and manage your assigned classroom.</p>
                    <span className="action-link">View Class <ArrowRight size={16} /></span>
                  </div>

                  <div className="action-card special" onClick={() => navigate(`/class/${localStorage.getItem("classId")}/assign-subjects`)}>
                    <h3>Assign Teachers</h3>
                    <p>As Class Teacher, you can assign subject teachers for your class.</p>
                    <span className="action-link">Start Assigning <ArrowRight size={16} /></span>
                  </div>
                </>
              )}

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}