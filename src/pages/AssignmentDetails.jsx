import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { ArrowLeft, Download, FileText } from "lucide-react";

export default function AssignmentDetails() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [mySubmission, setMySubmission] = useState(null);

  useEffect(() => {
    api
      .get(`/assignments/${assignmentId}`)
      .then((res) => setAssignment(res.data))
      .catch((err) => console.error(err));
  }, [assignmentId]);

  const downloadPdf = async () => {
    try {
      const response = await api.get(
        `/assignments/download/${assignmentId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "assignment.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert("❌ No PDF available");
    }
  };

  useEffect(() => {
    if (role === "TEACHER") {
      api
        .get(`/assignments/${assignmentId}/submissions`)
        .then((res) => setSubmissions(res.data))
        .catch((err) => console.error(err));
    }

    if (role === "STUDENT") {
      api
        .get(`/assignments/${assignmentId}/my-submission`)
        .then((res) => setMySubmission(res.data))
        .catch(() => setMySubmission(null));
    }
  }, [assignmentId, role]);

  const downloadSubmissionPdf = async (submissionId, fileName) => {
    try {
      const response = await api.get(
        `/assignments/submissions/download/${submissionId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("❌ Failed to download submission");
    }
  };

  



  if (!assignment) return <p>Loading...</p>;

  return (
    <div className="assignment-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <h2>{assignment.title}</h2>
      <p>{assignment.description}</p>

      <p>
        <strong>Due:</strong>{" "}
        {new Date(assignment.dueDate).toLocaleString()}
      </p>

      {assignment.filePath && (
        <button className="download-btn" onClick={downloadPdf}>
          <Download size={18} /> Download PDF
        </button>
      )}

      {role === "STUDENT" && (
        <button
          className="submit-btn"
          onClick={() =>
            navigate(`/student/submit/${assignmentId}`)
          }
        >
          Submit Assignment
        </button>
      )}

       {role === "STUDENT" && (
  <div className="submission-section">
    <h3>My Submission</h3>

    {mySubmission ? (
      <div className="submission-card">
        <div className="submission-info">
          <div>
            <strong>Assignment:</strong> {mySubmission.assignmentTitle}
          </div>
          <div>
            <strong>Submitted At:</strong>{" "}
            {new Date(mySubmission.submittedAt).toLocaleString()}
          </div>
          <div>
            <strong>Status:</strong> {mySubmission.status || "Pending"}
          </div>
          <div>
            <strong>Grade:</strong> {mySubmission.grade || "Not graded yet"}
          </div>
          <div className="file-download">
            <FileText size={18} />
            <span>{mySubmission.submissionFile}</span>
            <button
              onClick={() =>
                downloadSubmissionPdf(
                  mySubmission.id,
                  mySubmission.submissionFile
                )
              }
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>
    ) : (
      <>
        <p>No submission yet</p>
        <button
          className="submit-btn"
          onClick={() => navigate(`/student/submit/${assignmentId}`)}
        >
          Submit Assignment
        </button>
      </>
    )}
  </div>
)}


      {/* ================= TEACHER VIEW ================= */}
      {role === "TEACHER" && (
  <div className="submission-section">
    <h3>Student Submissions</h3>

    {submissions.length === 0 ? (
      <p>No submissions yet</p>
    ) : (
      submissions.map((s) => (
        <div key={s.id} className="submission-card">
          <div className="submission-info">
            <div>
              <strong>Student:</strong> {s.studentName} ({s.studentId})
            </div>
            <div>
              <strong>Assignment:</strong> {s.assignmentTitle} (ID: {s.assignmentId})
            </div>
            <div>
              <strong>Submitted At:</strong>{" "}
              {s.submittedAt ? new Date(s.submittedAt).toLocaleString() : "Not submitted"}
            </div>
            <div>
              <strong>Status:</strong> {s.status || "Pending"}
            </div>
            <div>
              <strong>Grade:</strong> {s.grade || "Not graded yet"}
            </div>
          </div>

          <div className="file-download">
            <FileText size={18} />
            <span>{s.submissionFile}</span>
            <button
              onClick={() =>
                downloadSubmissionPdf(s.id, s.submissionFile)
              }
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
)}




    </div>
  );
}
