import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Логин</h2>
      <div className="mb-4">
        <NavLink
          to="/student/profile"
          className="block px-4 py-2 text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Войти как ученик
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/teacher/profile"
          className="block px-4 py-2 text-center text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Войти как преподаватель
        </NavLink>
      </div>
    </div>
  );
}