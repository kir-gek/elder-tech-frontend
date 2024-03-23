import { NavLink } from "react-router-dom"

export const Login = () => {
    return (
        <div>
            ЛОГИН
            <div>
                <NavLink to="/student/profile">Войти как ученик</NavLink>
            </div>
            <div>
                <NavLink to="/teacher/profile">Войти как преподаватель</NavLink>
            </div>
        </div>
    )
}