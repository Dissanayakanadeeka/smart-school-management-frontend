import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/teachers/assignments")
      .then((res) => {
        setAssignments(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load assignments", err);
        setError("Failed to load assignments.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Teaching Assignments</h2>

      {assignments.length === 0 ? (
        <p>You have no assignments yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Grade</th>
              <th>Class</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.assignmentId}>
                <td>{a.gradeLevel}</td>
                <td>{a.className}</td>

                {/* 🔹 CLICKABLE SUBJECT */}
                <td>
                  <button
                    onClick={() => navigate(`/student/subjects/${a.subjectId}/${a.classId}`)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    {a.subjectName}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
