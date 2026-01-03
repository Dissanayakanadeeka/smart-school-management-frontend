import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function AssignSubjects() {
  const { classId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get(`/class-teacher/class/${classId}/subjects`),
      api.get("/teachers/all-teachers")
    ])
      .then(([subjectsRes, teachersRes]) => {
          console.log("Subjects response:", subjectsRes.data);
        setSubjects(subjectsRes.data);
        console.log("Teachers response value:", teachersRes.data);
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

    api
      .post("/class-teacher/assign", null, {
        params: { classId, subjectId, teacherId }
      })
      .then(() => alert("Teacher assigned successfully"))
      .catch((err) => {
        console.error("Assignment failed", err);
        alert("Assignment failed");
      });
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assign Teachers to Subjects</h2>

      {subjects.map((subject) => (
        <div key={subject.id} style={{ marginBottom: "12px" }}>
          <strong>{subject.name}</strong>

          <select
            value={selectedTeachers[subject.id] || ""}
            onChange={(e) =>
              setSelectedTeachers({
                ...selectedTeachers,
                [subject.id]: e.target.value
              })
            }
            style={{ marginLeft: "10px" }}
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleAssign(subject.id)}
            style={{ marginLeft: "10px" }}
          >
            Assign
          </button>
        </div>
      ))}
    </div>
  );
}
