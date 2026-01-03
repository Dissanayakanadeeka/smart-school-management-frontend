import { useState } from "react";
import axios from "axios";
import api from "../api";

function StudentRegister() {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    status: "",
    home_contact1: "",
    home_contact2: "",
    gradeLevel: "",
    className: ""
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
      const response = await api.post("students/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Student registered successfully");
      localStorage.setItem("profileCompleted", "true");

    // ✅ redirect to dashboard
    window.location.href = "/student-dashboard";
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Student Name" onChange={handleChange} />
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
      <input name="home_contact1" placeholder="Home Contact 1" onChange={handleChange} />
      <input name="home_contact2" placeholder="Home Contact 2" onChange={handleChange} />

      <select name="gradeLevel" onChange={handleChange}>
        <option value="">Select Grade</option>
        <option value="1">Grade 1</option>
        <option value="2">Grade 2</option>
        <option value="3">Grade 3</option>
        <option value="4">Grade 4</option>
        <option value="5">Grade 5</option>
        <option value="6">Grade 6</option>
        <option value="7">Grade 7</option>
        <option value="8">Grade 8</option>
        <option value="9">Grade 9</option>
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
        <option value="13">Grade 13</option>
      </select>

      <select name="className" onChange={handleChange}>
        <option value="">Select Class</option>
        <option value="opal">opal</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default StudentRegister;
