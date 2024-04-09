import Logo from "assets/images/logo.png";
import Login from "assets/images/login.png";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="bg-blue-600	flex justify-around h-16">
      <img src={Logo} />
      <NavLink to="/">ElderTech</NavLink>
      Версия для слабовидящих
      <div>
        <NavLink to="/teacher/my-students">Мои студенты</NavLink>
      </div>
      <div>
        <NavLink to="/teacher/my-courses">Мои курсы</NavLink>
      </div>
      <div>
        <NavLink to="/teacher/profile">Профиль</NavLink>
      </div>
      <div>
        <NavLink to="/login">
          <img className="h-full" src={Login} />
        </NavLink>
      </div>
    </div>
  );
};
