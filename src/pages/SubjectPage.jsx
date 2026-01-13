import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Download, Upload, ArrowLeft, FileText } from "lucide-react";

export default function SubjectPage() {
  const { subjectId, classId } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);

 // 🔹 Load lectures
  useEffect(() => {
    api
      .get(`/lectures/class/${classId}/subject/${subjectId}`)
      .then((res) => setLectures(res.data))
      .catch((err) => console.error(err));
  }, [subjectId, classId, token]);

  // 🔹 Load lectures
useEffect(() => {
  console.log("Fetching assignments...");
  api
    .get(`/assignments/class/${classId}/subject/${subjectId}`)
    .then((res) => {
      console.log("Assignments response:", res.data);
      setAssignments(res.data);
    })
    .catch((err) => console.error(err));
}, [subjectId, classId]);


  useEffect(() => {
  api
    .get(`/assignments/class/${classId}/subject/${subjectId}`)
    .then((res) => setAssignments(res.data))
    .catch((err) => console.error(err));
}, [subjectId, classId]);

const goToSubmission = (assignmentId) => {
  navigate(`/student/submit/${assignmentId}/${classId}/${subjectId}`);
};



  // 🔹 Secure download
  const downloadLecture = async (lectureId, fileName) => {
    try {
       const token = localStorage.getItem("token"); // ensure we have it here
       const response = await api.get(`/lectures/download/${lectureId}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed", error);
      alert("❌ Failed to download file");
    }
  };

  return (
    <div className="subject-page-container">
      {/* Header Section */}
      <header className="subject-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back to Subjects
        </button>
        <div className="header-flex">
          <div>
            <h1>Lecture Materials</h1>
            <p className="subtitle">Access your study resources and downloads</p>
          </div>
          {role === "TEACHER" && (
            <button
              className="upload-trigger-btn"
              onClick={() => navigate(`/subjects/${subjectId}/${classId}/upload`)}
            >
              <Upload size={18} /> Upload New Lecture
            </button>

            
          )}
          {role === "TEACHER" && (
            <button
              className="upload-trigger-btn"
              onClick={() => navigate(`/teacher/create/${classId}/${subjectId}`)}
            >
              <Upload size={18} /> Upload New Assignment
            </button>

            
          )}
        </div>
      </header>

      {/* Lecture Content */}
      <div className="lecture-grid">
        {lectures.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p>No lectures have been uploaded to this subject yet.</p>
          </div>
        ) : (
          lectures.map((l) => (
            <div key={l.id} className="lecture-card">
              <div className="file-icon-wrapper">
                <FileText size={32} className="file-icon" />
              </div>
              <div className="lecture-info">
                <h3>{l.title}</h3>
                <span className="file-name">{l.fileName}</span>
              </div>
              <button
                className="download-action-btn"
                onClick={() => downloadLecture(l.id, l.fileName)}
                title="Download File"
              >
                <Download size={20} />
              </button>
            </div>
          ))
        )}
      </div>


      <div className="assignments-section">
  <h2>Assignments</h2>

  {assignments.length === 0 ? (
    <p className="empty-text">No assignments available</p>
  ) : (
    assignments.map((a) => (
      <button
        key={a.id}
        className="assignment-title-btn"
        onClick={() =>
          navigate(`/assignments/${a.id}/${classId}/${subjectId}`)
        }
      >
        <FileText size={16} />
        {a.title}
      </button>
    ))
  )}
</div>


    </div>
  );
}
