import React, { useState } from 'react';
import Logo from "assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, logout } from "store/authSlice";
import { IRootState } from "store/root-reducer";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: IRootState) => selectIsLoggedIn(state));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white flex justify-around items-center h-16 shadow-md px-4 md:px-0">
      <button className="md:hidden" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 hover:text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm10.113-5.373a7 7 0 0 0-.445-.275l.21-.352q.183.111.452.287.27.176.51.428.234.246.398.562.164.31.164.692 0 .54-.216.873-.217.328-.721.328-.322 0-.504-.211a.7.7 0 0 1-.188-.463q0-.345.211-.521.205-.182.569-.182h.281a1.7 1.7 0 0 0-.123-.498 1.4 1.4 0 0 0-.252-.37 2 2 0 0 0-.346-.298m-2.168 0A7 7 0 0 0 10 6.352L10.21 6q.183.111.452.287.27.176.51.428.234.246.398.562.164.31.164.692 0 .54-.216.873-.217.328-.721.328-.322 0-.504-.211a.7.7 0 0 1-.188-.463q0-.345.211-.521.206-.182.569-.182h.281a1.8 1.8 0 0 0-.117-.492 1.4 1.4 0 0 0-.258-.375 2 2 0 0 0-.346-.3z" clipRule="evenodd" />
        </svg>
      </button>
      <img src={Logo} alt="Логотип" className="h-full" />
      <div className="hidden md:flex md:items-center justify-around w-full">
        <NavLink to="/" className="text-2xl font-bold text-emerald-800">Elder<span className="text-black">Tech</span></NavLink>
        {isLoggedIn && (
          <div className="flex">
            <NavLink to="/constructor/courses" className="text-lg font-medium text-gray-700 hover:text-blue-600 mx-4">Конструктор курсов</NavLink>
            <NavLink to="/my-courses" className="text-lg font-medium text-gray-700 hover:text-blue-600 mx-4">Мои курсы</NavLink>
            <NavLink to="/user/profile" className="text-lg font-medium text-gray-700 hover:text-blue-600 mx-4">Профиль</NavLink>
            <NavLink to="/contacts" className="text-lg font-medium text-gray-700 hover:text-blue-600 mx-4">Контакты</NavLink>
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mx-4"
            >
              Выйти
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <NavLink to="/contacts" className="text-lg font-medium text-gray-700 hover:text-blue-600 mx-4">Контакты</NavLink>
            <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mx-4">
              <NavLink to="/login">Войти в аккаунт</NavLink>
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col items-center">
          <NavLink to="/" className="text-2xl font-bold text-emerald-800 my-4">Elder<span className="text-black">Tech</span></NavLink>
          {isLoggedIn && (
            <div className="flex flex-col">
              <NavLink to="/constructor/courses" className="text-lg font-medium text-gray-700 hover:text-blue-600 my-2">Конструктор курсов</NavLink>
              <NavLink to="/my-courses" className="text-lg font-medium text-gray-700 hover:text-blue-600 my-2">Мои курсы</NavLink>
              <NavLink to="/user/profile" className="text-lg font-medium text-gray-700 hover:text-blue-600 my-2">Профиль</NavLink>
              <NavLink to="/contacts" className="text-lg font-medium text-gray-700 hover:text-blue-600 my-2">Контакты</NavLink>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 my-2"
              >
                Выйти
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="flex flex-col">
              <NavLink to="/contacts" className="text-lg font-medium text-gray-700 hover:text-blue-600 my-2">Контакты</NavLink>
              <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 my-2">
                <NavLink to="/login">Войти в аккаунт</NavLink>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
