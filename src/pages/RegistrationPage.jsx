import StudentRegister from "../components/StudentRegister";
import TeacherRegister from "../components/TeacherRegister";
import PrincipalRegister from "../components/PrincipalRegister";
function RegistrationPage() {
  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: "20px" }}>
      <h2>{role} Registration</h2>

      {role === "STUDENT" && <StudentRegister />}
      {role === "TEACHER" && <TeacherRegister />}
      {role === "PRINCIPAL" && <PrincipalRegister />}
      {!role && (
        <p style={{ color: "red" }}>
          Role not found. Please login again.
        </p>
      )}
    </div>
  );
}

export default RegistrationPage;
