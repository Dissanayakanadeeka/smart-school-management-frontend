import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function TeacherRegister() {
  const navigate = useNavigate();

  const subjects = [
    "Maths",
    "Science",
    "English",
    "History",
    "ICT"
  ];

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    status: "",
    contact: "",
    subjectNames: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;

    setFormData(prev => ({
      ...prev,
      subjectNames: prev.subjectNames.includes(value)
        ? prev.subjectNames.filter(s => s !== value)
        : [...prev.subjectNames, value]
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await api.post("teachers/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Teacher registered successfully");
      localStorage.setItem("profileCompleted", "true");

    // ✅ redirect to dashboard
    window.location.href = "/teacher-dashboard";
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input type="date" name="dateOfBirth" onChange={handleChange} />

      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
        <select name="status" onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="RESIGNED">RESIGNED</option>
      </select>
      <input name="contact" placeholder="Contact" onChange={handleChange} />

      <h4>Select Subjects</h4>

      {subjects.map(subject => (
        <label key={subject} style={{ display: "block" }}>
          <input
            type="checkbox"
            value={subject}
            onChange={handleSubjectChange}
          />
          {subject}
        </label>
      ))}

      <button type="submit">Register</button>
    </form>
  );
}

export default TeacherRegister;
