import { useParams } from "react-router-dom";
import { useState } from "react";
import { submitAssignment } from "../api/assignmentApi";

export default function SubmitAssignment() {
  const { assignmentId } = useParams();
  const [file, setFile] = useState(null);
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitAssignment(
      {
        assignmentId,
        studentId: 1, // from auth
        answerText,
      },
      file
    );

    alert("Assignment submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Assignment</h2>

      <textarea
        placeholder="Write your answer (optional)"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <small>PDF upload is optional</small>

      <button type="submit">Submit</button>
    </form>
  );
}
