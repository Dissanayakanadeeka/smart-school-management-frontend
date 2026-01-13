import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { ArrowLeft, Download, FileText, Calendar, Info, User, CheckCircle } from "lucide-react";
import "../styles/assignmentDetails.css";

export default function AssignmentDetails() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [mySubmission, setMySubmission] = useState(null);

  useEffect(() => {
    api.get(`/assignments/${assignmentId}`)
      .then((res) => setAssignment(res.data))
      .catch((err) => console.error(err));
  }, [assignmentId]);

  useEffect(() => {
    if (role === "TEACHER") {
      api.get(`/assignments/${assignmentId}/submissions`)
        .then((res) => setSubmissions(res.data))
        .catch((err) => console.error(err));
    }
    if (role === "STUDENT") {
      api.get(`/assignments/${assignmentId}/my-submission`)
        .then((res) => setMySubmission(res.data))
        .catch(() => setMySubmission(null));
    }
  }, [assignmentId, role]);

  const downloadFile = async (urlPath, fileName) => {
    try {
      const response = await api.get(urlPath, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "document.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert("❌ Failed to download file");
    }
  };

  if (!assignment) return <div className="loader-container">Loading Assignment...</div>;

  return (
    <div className="assignment-details-wrapper">
      <header className="details-header">
        <button className="back-link-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
      </header>

      {/* Conditional class based on role to change layout flow */}
      <div className={`details-grid ${role === "TEACHER" ? "teacher-layout" : "student-layout"}`}>
        
        {/* ASSIGNMENT INFO PANEL */}
        <div className="instructions-panel">
          <div className="assignment-main-info">
            <h1>{assignment.title}</h1>
            <div className="due-date-badge">
              <Calendar size={16} />
              <span>Due: {new Date(assignment.dueDate).toLocaleString()}</span>
            </div>
            <p className="description-text">{assignment.description}</p>
          </div>

          {assignment.filePath && (
            <div className="resource-box">
              <div className="resource-info">
                <div className="file-icon-bg"><FileText size={24} /></div>
                <div>
                  <h4>Assignment Materials</h4>
                  <p>Reference PDF provided by instructor</p>
                </div>
              </div>
              <button className="download-outline-btn" onClick={() => downloadFile(`/assignments/download/${assignmentId}`, "assignment.pdf")}>
                <Download size={18} /> Download
              </button>
            </div>
          )}
        </div>

        {/* SUBMISSIONS PANEL */}
        <div className="action-panel">
          {role === "STUDENT" && (
            <section className="submission-block">
              <div className="block-title">
                <h3>Your Submission</h3>
                {mySubmission ? <span className="status-tag success">Submitted</span> : <span className="status-tag warning">Pending</span>}
              </div>

              {mySubmission ? (
                <div className="my-submission-card">
                  <div className="submission-stats">
                    <div className="stat-item">
                      <label>Grade</label>
                      <strong className={mySubmission.grade ? "grade-highlight" : ""}>
                        {mySubmission.grade || "Pending Review"}
                      </strong>
                    </div>
                    <div className="stat-item">
                      <label>Status</label>
                      <span>{mySubmission.status || "Submitted"}</span>
                    </div>
                  </div>
                  
                  <div className="file-attachment-row">
                    <div className="file-meta">
                        <FileText size={18} />
                        <span className="truncate">{mySubmission.submissionFile}</span>
                    </div>
                    <button className="icon-btn" onClick={() => downloadFile(`/assignments/submissions/download/${mySubmission.id}`, mySubmission.submissionFile)}>
                      <Download size={18} />
                    </button>
                  </div>
                  <p className="timestamp">Submitted on: {new Date(mySubmission.submittedAt).toLocaleString()}</p>
                </div>
              ) : (
                <div className="empty-submission">
                  <Info size={32} />
                  <p>You haven't submitted this assignment yet.</p>
                  <button className="primary-action-btn" onClick={() => navigate(`/student/submit/${assignmentId}`)}>
                    Start Submission
                  </button>
                </div>
              )}
            </section>
          )}

          {role === "TEACHER" && (
            <section className="teacher-submission-section">
              <div className="section-header-row">
                <h3>Student Submissions</h3>
                <span className="count-pill">{submissions.length} Total</span>
              </div>

              <div className="submissions-list-container">
                {submissions.length === 0 ? (
                  <div className="empty-state">No student submissions found.</div>
                ) : (
                  submissions.map((s) => (
                    <div key={s.id} className="submission-wide-card">
                      <div className="student-profile-info">
                        <div className="avatar-placeholder"><User size={20}/></div>
                        <div>
                          <h4>{s.studentName}</h4>
                          <span className="id-tag">ID: {s.studentId}</span>
                        </div>
                      </div>

                      <div className="submission-meta-details">
                        <div className="meta-col">
                          <label>Submitted At</label>
                          <span>{new Date(s.submittedAt).toLocaleString()}</span>
                        </div>
                        <div className="meta-col">
                          <label>Status</label>
                          <span className={`status-pill ${s.grade ? 'graded' : 'pending'}`}>
                            {s.grade ? "Graded" : "Needs Grading"}
                          </span>
                        </div>
                        <div className="meta-col">
                          <label>Grade</label>
                          <span className="grade-value">{s.grade || "--"}</span>
                        </div>
                      </div>

                      <div className="submission-actions">
                         <div className="file-tag">
                            <FileText size={14} />
                            <span className="file-name">{s.submissionFile}</span>
                         </div>
                         <button className="download-outline-btn small" onClick={() => downloadFile(`/assignments/submissions/download/${s.id}`, s.submissionFile)}>
                            <Download size={16} /> Download
                         </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}