import React,{ useState, useEffect } from "react";
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
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome {username}! to your dashboard!</p>
    </div>
  );
}

