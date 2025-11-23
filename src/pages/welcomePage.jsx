import React from "react";
import "../styles/welcomePage.css";

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      {/* Floating Shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>


      <div className="welcome-card">
        <h1 className="title">Welcome to <span>EduMaster</span></h1>
        <p className="subtitle">
          A smart and powerful School Management System that brings 
          students, teachers, and administrators together.
        </p>

        <div className="btn-group">
          <a href="/login" className="welcome-btn login-btn">Login</a>
          <a href="/about" className="welcome-btn explore-btn">Explore</a>
        </div>
      </div>
    </div>
  );
}



