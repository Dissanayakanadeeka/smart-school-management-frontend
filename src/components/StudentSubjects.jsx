import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { BookOpen, GraduationCap, ChevronRight, LayoutGrid } from "lucide-react";
import "../styles/studentSubjects.css";

export default function StudentSubjects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const classId = localStorage.getItem("classId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/students/my-subjects")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load subjects");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading subjects...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
    <div className="subjects-container">
      {/* Grade & Class Info Bar */}
      <div className="academic-info-bar">
        <div className="info-stat">
          <GraduationCap className="icon-blue" />
          <div>
            <span>Grade Level</span>
            <strong>{data.gradeLevel}</strong>
          </div>
        </div>
        <div className="info-stat">
          <LayoutGrid className="icon-blue" />
          <div>
            <span>Assigned Class</span>
            <strong>{data.className}</strong>
          </div>
        </div>
      </div>

      <div className="subjects-header">
        <h3>Enrolled Subjects</h3>
        <div className="count-badge">{data.subjects.length} Courses</div>
      </div>

      <div className="subjects-grid">
        {data.subjects.map((s) => (
          <div key={s.id} className="subject-card">
            <div className="subject-card-icon">
              <BookOpen size={24} />
            </div>
            <div className="subject-card-body">
              <h4>{s.name}</h4>
              <p>View lessons and materials</p>
            </div>
            <button 
              className="enter-course-btn"
              onClick={() => navigate(`/student/subjects/${s.id}/${classId}`)}
            >
              <span>Enter</span>
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
