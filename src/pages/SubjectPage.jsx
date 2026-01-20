import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Download, PlusCircle, ArrowLeft, FileText, ClipboardList, BookOpen } from "lucide-react";
import "../styles/subjectPage.css";

export default function SubjectPage() {
  const { subjectId, classId } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    api.get(`/lectures/class/${classId}/subject/${subjectId}`)
      .then((res) => setLectures(res.data))
      .catch((err) => console.error(err));

    api.get(`/assignments/class/${classId}/subject/${subjectId}`)
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error(err));
  }, [subjectId, classId]);

  const downloadLecture = async (lectureId, fileName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/lectures/download/${lectureId}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("❌ Download failed");
    }
  };

  return (
    <div className="subject-page-wrapper">
      {/* Top Header Section */}
      <header className="subject-top-bar">
        <button className="back-nav-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="subject-info-row">
          <h1>Subject Resources</h1>
          {role === "TEACHER" && (
            <div className="teacher-btn-group">
              <button className="add-btn secondary" onClick={() => navigate(`/subjects/${subjectId}/${classId}/upload`)}>
                <PlusCircle size={18} /> Upload Lecture
              </button>
              <button className="add-btn primary" onClick={() => navigate(`/teacher/create/${classId}/${subjectId}`)}>
                <PlusCircle size={18} /> New Assignment
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SECTION 1: LECTURES (On Top) */}
      <section className="content-block">
        <div className="block-header">
          <BookOpen size={20} className="header-icon blue" />
          <h2>Lectures & Materials</h2>
          <span className="count-badge">{lectures.length}</span>
        </div>
        
        <div className="lecture-stack">
          {lectures.length === 0 ? (
            <div className="empty-state-small">No lectures uploaded yet.</div>
          ) : (
            lectures.map((l) => (
              <div key={l.id} className="lecture-strip">
                <div className="strip-icon"><FileText size={20} /></div>
                <div className="strip-details">
                  <h4>{l.title}</h4>
                  <p>{l.fileName}</p>
                </div>
                <button
                  className="download-outline-btn"
                  onClick={() => downloadLecture(l.id, l.fileName)}
                  title="Download File"
                >
                  <Download size={20} strokeWidth={2.5} /> Download PDF
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="content-block">
        <div className="block-header">
          <ClipboardList size={20} className="header-icon purple" />
          <h2>Assignments</h2>
          <span className="count-badge">{assignments.length}</span>
        </div>

        <div className="assignment-stack">
          {assignments.length === 0 ? (
            <div className="empty-state-small">No assignments assigned.</div>
          ) : (
            assignments.map((a) => (
              <div 
                key={a.id} 
                className="assignment-strip"
                onClick={() => navigate(`/assignments/${a.id}/${classId}/${subjectId}`)}
              >
                <div className="assignment-title-row">
                  <div className="status-dot"></div>
                  <h3>{a.title}</h3>
                </div>
                <div className="view-link">View Details <ArrowLeft size={16} style={{transform: 'rotate(180deg)'}} /></div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}