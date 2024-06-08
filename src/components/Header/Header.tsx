import React from 'react';
import Logo from "assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, logout } from "store/authSlice";
import { IRootState } from "store/root-reducer";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: IRootState) => selectIsLoggedIn(state));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white flex justify-around items-center h-16 shadow-md">
      <img src={Logo} alt="Логотип" className="h-full" />
      <NavLink to="/" className="text-2xl font-bold text-emerald-800">Elder<span className="text-black">Tech</span></NavLink>
      <span className="text-lg font-medium text-gray-700">Версия для слабовидящих</span>
      {isLoggedIn && (
        <>
          <div>
            <NavLink to="/teacher/my-students" className="text-lg font-medium text-gray-700 hover:text-blue-600">Мои студенты</NavLink>
          </div>
          <div>
            <NavLink to="/teacher/my-courses" className="text-lg font-medium text-gray-700 hover:text-blue-600">Мои курсы</NavLink>
          </div>
          <div>
            <NavLink to="/user/profile" className="text-lg font-medium text-gray-700 hover:text-blue-600">Профиль</NavLink>
          </div>
        </>
      )}
      <div>
        <NavLink to="/contacts" className="text-lg font-medium text-gray-700 hover:text-blue-600">Контакты</NavLink>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Выйти
          </button>
        ) : (
          <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
            <NavLink to="/login">Войти в аккаунт</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

