import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Login } from "./components/Login/Login";
import { StartPage } from "./components/StartPage/StartPage";
import { StudentProfile } from "./components/Students/Profile/Profile";
import { TeacherProfile } from "./components/Teacher/Profile/Profile";
import { MyStudents } from "./components/Teacher/MyStudents/MyStudents";
import { MyCourses } from "./components/Teacher/MyCourses/MyCourses";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/student/profile"
          element={<StudentProfile studentId={1} />}
        />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/my-students" element={<MyStudents />} />
        <Route path="/teacher/my-courses" element={<MyCourses />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;