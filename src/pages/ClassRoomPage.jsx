import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, GraduationCap, Hash, User } from "lucide-react";
import "../styles/classRoomPage.css";

export default function ClassRoomPage() {
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/classrooms/students")
      .then((res) => setClassData(res.data))
      .catch((err) => {
        console.error("Failed to load students", err);
        setError("Failed to load class data.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="classroom-loader">Loading class details...</div>;
  if (error) return <div className="classroom-error">{error}</div>;
  if (!classData) return <div className="classroom-empty">No class assigned yet.</div>;

  return (
    <div className="classroom-page-container">
      {/* Header Section */}
      <header className="classroom-header">
        <button className="classroom-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="classroom-title-info">
          <h1>My Classroom</h1>
          <div className="classroom-badges">
            <span className="badge-item"><GraduationCap size={16} /> {classData.className}</span>
            <span className="badge-item"><Users size={16} /> Grade {classData.gradeLevel}</span>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main className="classroom-content">
        <div className="student-list-card">
          <div className="card-header">
            <h2>Students Enrolled</h2>
            <span className="student-count">{classData.students.length} Total</span>
          </div>

          {classData.students.length === 0 ? (
            <div className="no-students-state">
              <Users size={48} />
              <p>No students have been enrolled in this class yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="student-table">
                <thead>
                  <tr>
                    <th><Hash size={14} /> Student ID</th>
                    <th><User size={14} /> Full Name</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.students.map((student) => (
                    <tr key={student.id}>
                      <td className="id-cell">{student.id}</td>
                      <td className="name-cell">{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}