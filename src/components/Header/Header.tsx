import Logo from "assets/images/logo.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white flex justify-around items-center h-16 shadow-md">
    <img src={Logo} alt="Логотип" className="h-full" />
    <NavLink to="/" className="text-xl font-bold text-blue-600">ElderTech</NavLink>
    <span className="text-lg font-medium text-gray-700">Версия для слабовидящих</span>
    <div>
      <NavLink to="/teacher/my-students" className="text-lg font-medium text-gray-700 hover:text-blue-600">Мои студенты</NavLink>
    </div>
    <div>
      <NavLink to="/teacher/my-courses" className="text-lg font-medium text-gray-700 hover:text-blue-600">Мои курсы</NavLink>
    </div>
    <div>
      <NavLink to="/teacher/profile" className="text-lg font-medium text-gray-700 hover:text-blue-600">Профиль</NavLink>
    </div>
    <div>
      <button className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg">
        <NavLink to="/login">Зарегистрироваться</NavLink>
      </button>
    </div>
  </div>
  
  );
};
