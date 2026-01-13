import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/assignments",
});

// Add JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("💡 Sending token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Teacher creates assignment (optional PDF)

export const createAssignment = (assignment, file) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(assignment)], { type: "application/json" })
  );

  if (file) formData.append("file", file);

  return API.post("/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get assignments for a class and subject
export const getAssignments = (classId, subjectId) => {
  return API.get(`/class/${classId}/subject/${subjectId}`);
};

// Student submits assignment (optional PDF)
export const submitAssignment = (submission, file) => {
  const formData = new FormData();
  formData.append(
     "data",
    new Blob([JSON.stringify(submission)], { type: "application/json" })
  );

  if (file) formData.append("file", file);

  return API.post("/submit", formData);
};

// Get student's submissions
export const getMySubmissions = (studentId) => {
  return API.get(`/my?studentId=${studentId}`);
};

export const downloadAssignmentPdf = async (assignmentId) => {
  const token = localStorage.getItem("token");

  return API.get(`/assignments/download/${assignmentId}`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
