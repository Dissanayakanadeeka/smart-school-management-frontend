import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { UserPlus, Book, UserCheck, ArrowLeft, Loader2 } from "lucide-react";
import "../styles/assignSubjects.css";

export default function AssignSubjects() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(null); // Track which subject is being assigned

  useEffect(() => {
    Promise.all([
      api.get(`/class-teacher/class/${classId}/subjects`),
      api.get("/teachers/all-teachers")
    ])
      .then(([subjectsRes, teachersRes]) => {
        setSubjects(subjectsRes.data);
        setTeachers(
          Array.isArray(teachersRes.data)
            ? teachersRes.data
            : teachersRes.data.data || teachersRes.data.teachers || []
        );
      })
      .catch((err) => {
        console.error("Failed to load data", err);
        setError("Failed to load subjects or teachers.");
      })
      .finally(() => setLoading(false));
  }, [classId]);

  const handleAssign = (subjectId) => {
    const teacherId = selectedTeachers[subjectId];

    if (!teacherId) {
      alert("Please select a teacher");
      return;
    }

    setSubmitting(subjectId);
    api
      .post("/class-teacher/assign", null, {
        params: { classId, subjectId, teacherId }
      })
      .then(() => alert("Teacher assigned successfully"))
      .catch((err) => {
        console.error("Assignment failed", err);
        alert("Assignment failed");
      })
      .finally(() => setSubmitting(null));
  };

  if (loading) return <div className="loader-container"><Loader2 className="spinner" /> Loading Subject Data...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="assign-page-wrapper">
      <header className="assign-header">
        <button className="minimal-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="title-group">
          <h1>Assign Subject Teachers</h1>
          <p>Link specialized teachers to the curriculum for Class ID: {classId}</p>
        </div>
      </header>

      <div className="assign-grid">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-assign-card">
            <div className="card-top">
              <div className="subject-icon-box">
                <Book size={20} />
              </div>
              <h3>{subject.name}</h3>
            </div>

            <div className="card-body">
              <label>Select Instructor</label>
              <select
                value={selectedTeachers[subject.id] || ""}
                onChange={(e) =>
                  setSelectedTeachers({
                    ...selectedTeachers,
                    [subject.id]: e.target.value
                  })
                }
              >
                <option value="">-- Choose Teacher --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={`assign-action-btn ${selectedTeachers[subject.id] ? 'ready' : ''}`}
              onClick={() => handleAssign(subject.id)}
              disabled={submitting === subject.id}
            >
              {submitting === subject.id ? (
                <Loader2 size={16} className="spinner" />
              ) : (
                <><UserPlus size={16} /> Assign Teacher</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}