import React from "react";
import StudentSubjects from "../components/StudentSubjects";
import "../styles/studentDashboard.css";

export default function MyCourses() {
  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h2>My Courses</h2>
        <p>All subjects you are enrolled in</p>
      </header>

      <section className="dashboard-content">
        <StudentSubjects />
      </section>
    </div>
  );
}
