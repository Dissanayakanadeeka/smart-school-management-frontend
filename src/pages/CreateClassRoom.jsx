import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function CreateClassRoom() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: "",
    gradeLevel: "",
    teacherusername: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "gradeLevel" ? Number(value) : value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await api.post("/classrooms/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("New class registered successfully");
    // ✅ redirect to dashboard
    window.location.href = "/principal-dashboard";
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Classroom</h2>

      <div>
        <label>Class Name</label><br />
        <input
          name="className"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Grade Level</label><br />
        <input
          type="number"
          name="gradeLevel"
          min="1"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Class Teacher Username</label><br />
        <input
          name="teacherusername"
          onChange={handleChange}
          placeholder="teacher username"
        />
      </div>

      <button type="submit">Create Classroom</button>
    </form>
  );
}

export default CreateClassRoom;
