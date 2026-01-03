import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function UploadLecturePage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { classId } = useParams();


  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const uploadLecture = async () => {
    if (!file || !title) {
      alert("Title and file required");
      return;
    }

    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("classId", classId);
    formData.append("title", title);
    formData.append("file", file);

    try {
      await api.post("/lectures/upload", formData);

      alert("Lecture uploaded successfully!");
      navigate(-1); // go back to SubjectPage
    } catch (error) {
      console.error(error);
      alert("Failed to upload lecture");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Lecture</h2>

      <input
        type="text"
        placeholder="Lecture title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />

      <button onClick={uploadLecture}>Upload</button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
