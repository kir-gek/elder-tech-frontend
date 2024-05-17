import React, { useState, FormEvent } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "store/authSlice"; // Измените путь в соответствии с вашей структурой проекта
import { NavLink } from "react-router-dom";

interface JwtPayload {
  id: number;
}

export const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://45.80.69.116/api/v1/auth/sign-in",
        {
          phone,
          password,
        }
      );

      if (response.data.token) {
        const decodedToken = jwtDecode<JwtPayload>(response.data.token);
        const currentID = decodedToken.id;

        // Диспатчим токен и currentID в Redux
        dispatch(login({ token: response.data.token, id: currentID }));

        setMessage("Авторизация прошла успешно");
      } else {
        setMessage("Ошибка входа: " + response.data.message);
      }
    } catch (error: any) {
      setMessage(
        "Ошибка входа: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Войти в существующий аккаунт
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Номер телефона
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Войти
            </button>
            <NavLink
              to="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Нет аккаунта?
            </NavLink>
          </div>
        </form>
        {message && (
          <div
            className={`mt-4 p-4 ${
              message.includes("Ошибка")
                ? "bg-red-100 border-red-500 text-red-700"
                : "bg-green-100 border-green-500 text-green-700"
            } border-t border-b`}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
