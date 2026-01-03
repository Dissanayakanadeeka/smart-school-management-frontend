import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/welcomePage.jsx";
import LoginPage from "./pages/Login.jsx";
import HomePage from "./pages/Home.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashbord.jsx";
import PrincipalDashboard from "./pages/PrincipalDashbord.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import CreateClassRoom from "./pages/CreateClassRoom";
import ClassRoomPage from "./pages/ClassRoomPage.jsx";
import AssignSubjects from "./components/ClassTeacherAssign.jsx";
import TeacherAssignments from "./components/TeacherAssignments.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";
import UploadLecturePage from "./pages/UploadLecturePage.jsx";
import Navbar from "./components/Navbar.jsx";
import MyCourses from "./pages/MyCourses.jsx";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<HomePage/>}/>
        <Route path="/student-dashboard" element={<StudentDashboard/>}/>
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
        <Route path="/principal-dashboard" element={<PrincipalDashboard/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/classrooms/create" element={<CreateClassRoom />} />
        <Route path="/teacher/my-class" element={<ClassRoomPage />} />
        <Route path="/class/:classId/assign-subjects" element={<AssignSubjects />} />
        <Route path="/teacher/my-subjects" element={<TeacherAssignments />} />
        <Route path="/student/subjects/:subjectId/:classId" element={<SubjectPage />} />
        <Route path="/subjects/:subjectId/upload" element={<UploadLecturePage />} />
        <Route path="/student/courses" element={<MyCourses />} />
      </Routes>
    </BrowserRouter>
  );
}
