import Logo from "../../assets/images/logo.png"
import Login from "../../assets/images/login.png"
import s from "./Header.module.css"
import { NavLink } from "react-router-dom"
export const Header = () => {
    return (
        <div className={s.Header}>
            <img src={Logo} />
            Версия для слабовидящих
            <div>
                <NavLink to='/teacher/my-students'>Мои студенты</NavLink>
            </div>
            <div>
                <NavLink to='/teacher/my-courses'>Мои курсы</NavLink>
            </div>
            <div>
                <NavLink to='/teacher/profile'>Профиль</NavLink>
            </div>
            <div>
                <img src={Login} />
                <NavLink to="/login"> Войти </NavLink>
            </div>

        </div>
    )
}



