import React, { useState, useEffect } from "react";
import api from "../api"; // your axios instance
import { useNavigate } from "react-router-dom";

export default function ClassRoomPage() {
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/classrooms/students")
      .then((res) => {
        setClassData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load students", err);
        setError("Failed to load class data.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading class details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!classData) {
    return <p>No class assigned.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Class</h1>
      <p>
        <strong>Class Name:</strong> {classData.className}
      </p>
      <p>
        <strong>Grade Level:</strong> {classData.gradeLevel}
      </p>

      <h2>Students</h2>
      {classData.students.length === 0 ? (
        <p>No students in this class.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {classData.students.map((student) => (
              <tr key={student.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
}
