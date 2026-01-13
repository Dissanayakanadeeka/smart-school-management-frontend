import { useState } from "react";
import { createAssignment } from "../api/assignmentApi";
import { useParams } from "react-router-dom"; 
export default function TeacherCreateAssignment() {
  const { classId, subjectId } = useParams();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    classId:  classId || "", 
    subjectId: subjectId || "",
    teacherId: 1, // from auth
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await createAssignment(form, file);
       console.log("✅ Response from backend:", response);
      alert("✅ Assignment created successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create assignment");
      if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
      console.error("Headers:", err.response.headers);
    }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Assignment</h2>

      <input placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="datetime-local"
        onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
        }
        required
        />



      <input type="file" accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <small>PDF is optional</small>

      <button type="submit">Create</button>
    </form>
  );
}
