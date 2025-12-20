import React from "react";
import "../styles/welcomePage.css";

export default function WelcomePage() {
  return (
    <div className="welcome-wrapper">
      {/* LEFT SIDE: Content */}
      <div className="welcome-left">
        <div className="welcome-content">
          <h1 className="title">WELCOME TO <br /><span>EDUMASTER</span></h1>
          <p className="subtitle">
            Empowering educators and students with our integrated school management platform. 
            Streamline administration, grading, and communication in one place.
          </p>

          <div className="btn-group">
            <a href="/login" className="welcome-btn login-btn">Get Started</a>
            <a href="/about" className="welcome-btn explore-btn">Learn More</a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Visual Section */}
      <div className="welcome-right">
        <div className="image-accent-bar"></div>
        <div className="main-image-area">
            {/* This area will be filled via CSS background */}
            <div className="image-card-overlay">
                <h3>Admin & Student Portal</h3>
                <p>Everything you need in one secure dashboard.</p>
            </div>
        </div>
      </div>
    </div>
  );
}