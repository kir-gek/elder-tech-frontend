import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { StartPage } from './components/StartPage/StartPage';
import { StudentProfileContainer } from './components/Students/Profile/ProfileContainer';
import { TeacherProfileContainer } from './components/Teacher/Profile/ProfileContainer';
import { MyStudentsContainer } from './components/Teacher/MyStudents/MyStudentsContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='' element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/student/profile' element={<StudentProfileContainer />} />
        <Route path='/teacher/profile' element={<TeacherProfileContainer />} />
        <Route path='/teacher/my-students' element={<MyStudentsContainer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
