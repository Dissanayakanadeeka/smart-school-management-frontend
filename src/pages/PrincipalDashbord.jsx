import React, { useState, useEffect }from "react";
import {useNavigate} from "react-router-dom";

export default function PrincipalDashboard() {
    const username = localStorage.getItem("username");
    const navigate=useNavigate();
    const [profileCompleted, setProfileCompleted] = useState(true);

  useEffect(() => {
    const flag = localStorage.getItem("profileCompleted") === "true";
    setProfileCompleted(flag);
  }, []);
    if (!profileCompleted) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Complete Registration</h1>
        <p>You have not completed your student registration.</p>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Complete Registration
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Principal Dashboard</h1>
      <p>
        Welcome, {username}! Here you can manage school-wide activities and oversee operations.
      </p>

      {/* ✅ Create Classroom Button */}
      <button
        onClick={() => navigate("/classrooms/create")}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "green",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        ➕ Create Classroom
      </button>
    </div>
  );
}