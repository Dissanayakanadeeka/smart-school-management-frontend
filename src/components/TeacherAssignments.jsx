import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, GraduationCap, ChevronRight, LayoutGrid } from "lucide-react";
import api from "../api";
import "../styles/teacherAssignments.css";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  if (loading) return <div className="assignments-loader">Loading your workspace...</div>;
  if (error) return <div className="assignments-error">{error}</div>;

  return (
    <div className="teacher-assignments-container">
      <header className="assignments-header">
        <div className="header-title">
          <LayoutGrid className="header-icon" />
          <div>
            <h1>My Teaching Assignments</h1>
            <p>Select a subject to manage lectures and assignments</p>
          </div>
        </div>
      </header>

      {assignments.length === 0 ? (
        <div className="empty-assignments">
          <BookOpen size={48} />
          <p>You haven't been assigned to any subjects yet.</p>
        </div>
      ) : (
        <div className="assignments-grid">
          {assignments.map((a) => (
            <div 
              key={a.assignmentId} 
              className="assignment-card"
              onClick={() => navigate(`/student/subjects/${a.subjectId}/${a.classId}`)}
            >
              <div className="card-accent"></div>
              <div className="card-content">
                <div className="subject-info">
                  <span className="subject-tag">Subject</span>
                  <h3>{a.subjectName}</h3>
                </div>

                <div className="class-meta">
                  <div className="meta-item">
                    <GraduationCap size={16} />
                    <span>Grade {a.gradeLevel}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>Class {a.className}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="manage-text">Manage Course</span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}