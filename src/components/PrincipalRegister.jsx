import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function PrincipalRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    enterDate: "",
    status: "",
    contact: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await api.post("principal/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Principal registered successfully");
      localStorage.setItem("profileCompleted", "true");

    // ✅ redirect to dashboard
    window.location.href = "/principal-dashboard";
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Principal Registration</h2>

        <div>
    <label htmlFor="name">Name</label><br />
    <input
      id="name"
      name="name"
      placeholder="Enter name"
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label htmlFor="dateOfBirth">Date of Birth</label><br />
    <input
      type="date"
      id="dateOfBirth"
      name="dateOfBirth"
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label htmlFor="enterDate">Enter Date</label><br />
    <input
      type="date"
      id="enterDate"
      name="enterDate"
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label htmlFor="contact">Contact</label><br />
    <input
      id="contact"
      name="contact"
      placeholder="Contact number"
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label htmlFor="status">Status</label><br />
    <select
      id="status"
      name="status"
      onChange={handleChange}
      required
    >
      <option value="">Select Status</option>
      <option value="ACTIVE">ACTIVE</option>
      <option value="RESIGNED">RESIGNED</option>
    </select>
  </div>
      <button type="submit">Complete Profile</button>
    </form>
  );
}

export default PrincipalRegister;
