import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { StartPage } from './components/StartPage/StartPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='' element={<StartPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
