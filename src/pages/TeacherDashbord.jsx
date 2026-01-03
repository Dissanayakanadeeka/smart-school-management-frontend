import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // adjust path if needed

export default function PrincipalDashboard() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [profileCompleted, setProfileCompleted] = useState(true);
  const [hasClass, setHasClass] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check profile completed
  useEffect(() => {
    const flag = localStorage.getItem("profileCompleted") === "true";
    setProfileCompleted(flag);
  }, []);

  // Fetch teacher class status using Axios
  useEffect(() => {
    api
      .get("/teachers/class-status")
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



  // Profile not completed
  if (!profileCompleted) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Complete Registration</h1>
        <p>You have not completed your Teacher registration.</p>

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

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Dashboard</h1>
      <p>Welcome, {username}!</p>

      {hasClass && (
  <div style={{ marginTop: "15px" }}>
    {/* View My Class */}
    <button
      onClick={() => navigate("/teacher/my-class")}
      style={{
        padding: "10px 20px",
        background: "green",
        color: "white",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginRight: "10px"
      }}
    >
      View My Class
    </button>

    {/* Assign Teachers to Subjects (Class Teacher only) */}
    <button
      onClick={() => navigate(`/class/${localStorage.getItem("classId")}/assign-subjects`)}
      style={{
        padding: "10px 20px",
        background: "#6a1b9a",
        color: "white",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer"
      }}
    >
      Assign Teachers to Subjects
    </button>
  </div>
)}


      {/* ✅ NEW BUTTON: View Assigned Subjects */}
      <button
        onClick={() => navigate("/teacher/my-subjects")}
        style={{
          padding: "10px 20px",
          background: "#6a1b9a",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "15px",
          display: "block"
        }}
      >
        My Subjects
      </button>
    </div>
  );
}
