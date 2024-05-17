import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { Login } from "components/Login/Login";
import { StartPage } from "components/StartPage/StartPage";
import { StudentProfile } from "components/Students/Profile/Profile";
import { TeacherProfile } from "components/Teacher/Profile/Profile";
import { MyStudents } from "components/Teacher/MyStudents/MyStudents";
import { MyCourses } from "components/Teacher/MyCourses/MyCourses";
import { UserProfile } from "components/User/UserProfile";
import { Registration } from "components/Login/Registration";
import { Contact } from "components/Contacts/Contact";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-grow mt-16"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-vector/botanical-frame-on-a-beige-background_53876-116816.jpg?w=1380&t=st=1715913473~exp=1715914073~hmac=9de576b4e5524081f9c414337b5bbfcc78d03639d078d7ae70dd11a6a14fa458)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Routes>
          <Route path="" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/student/profile"
            element={<StudentProfile studentId={1} />}
          />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/my-students" element={<MyStudents />} />
          <Route path="/teacher/my-courses" element={<MyCourses />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path = "/contacts" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
