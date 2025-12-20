import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const role = localStorage.getItem("role");  // get user role

  const canRegisterStudent =
    role === "ROLE_TEACHER" ||
    role === "ROLE_PRINCIPAL" ||
    role === "ROLE_ADMIN";

  return (
    <div className="home-container">
      <h1>Welcome to the Learning Management System</h1>
      <p>Please <Link to="/login">login</Link> to continue.</p>

      {canRegisterStudent && (
        <div style={{ marginTop: "20px" }}>
          <Link to="/student-register">
            <button className="btn btn-primary">
              Register New Student
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
