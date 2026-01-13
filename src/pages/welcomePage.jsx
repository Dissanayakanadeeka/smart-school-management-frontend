import React from "react";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import "../styles/welcomePage.css";

export default function WelcomePage() {
  return (
    <div className="welcome-wrapper">
      {/* LEFT SIDE: Content */}
      <div className="welcome-left">
        <div className="welcome-content">
          <div className="badge">✨ Education Management Simplified</div>
          <h1 className="title">
            WELCOME TO <br />
            <span>EDUMASTER</span>
          </h1>
          <p className="subtitle">
            Empowering educators and students with our integrated school
            management platform. Streamline administration, grading, and
            communication in one place.
          </p>

          <div className="btn-group">
            <a href="/login" className="welcome-btn login-btn">
              Get Started <ArrowRight size={20} />
            </a>
            <a href="/about" className="welcome-btn explore-btn">
              <Play size={18} fill="currentColor" /> Learn More
            </a>
          </div>

          
          
        </div>
      </div>

      {/* RIGHT SIDE: Visuals */}
      <div className="welcome-right">
        <div className="main-image-area">
          {/* Floating Live Status */}
          <div className="floating-card">
            <span className="pulse-dot"></span>
            Live Campus Data
          </div>

          <div className="image-card-overlay">
            <h3>Admin & Student Portal</h3>
            <p>Everything you need in one secure dashboard.</p>
            <div className="progress-bar-demo">
                <div className="progress-fill"></div>
            </div>
            <div className="progress-text">System Status: 98% Optimized</div>
          </div>
        </div>
      </div>
    </div>
  );
}