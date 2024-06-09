import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { Login } from "components/Login/Login";
import { StartPage } from "components/StartPage/StartPage";
import { MyCourses } from "components/MyCourses/MyCourses";
import { UserProfile } from "components/User/UserProfile";
import { Registration } from "components/Login/Registration";
import { Contact } from "components/Contacts/Contact";
import { CoursePage } from "components/MyCourses/CoursePage";
import { CourseDetail } from "components/StartPage/CourseDetail";
import { Courses } from "components/StartPage/Courses";
import { Test } from "components/Test/Test";
import { ConstructorCourse } from "components/ConstructorCourses/ConstructorCourse";
import { ConstructorBlock } from "components/ConstructorCourses/ConstructorBlock/ConstructorBlock";
import { CreateNewCourse } from "components/ConstructorCourses/CreateNewCourse";
import { ConstructorLessons } from "components/ConstructorCourses/ConstructorLessons/ConstrucrorLessons";
import { Lessons } from "components/MyCourses/Lessons/Lessons";

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
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/my-courses/:id" element={<CoursePage />} />
          <Route path="/my-courses/block/:id" element={<Lessons />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path = "/contacts" element={<Contact />} />
          <Route path="/constructor/courses" element={<ConstructorCourse />} />
          <Route path="/constructor/courses/:id" element={<ConstructorBlock />} />
          <Route path="/constructor/create-course" element={<CreateNewCourse />} />
          <Route path="/constructor/courses/blocks/:id" element={<ConstructorLessons />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
