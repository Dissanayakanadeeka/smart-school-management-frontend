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

export default function App(){
  return (
    <BrowserRouter>
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

      </Routes>
    </BrowserRouter>
  );
}
