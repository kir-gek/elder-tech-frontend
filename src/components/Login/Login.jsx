import { NavLink } from "react-router-dom"

export const Login = () => {
    return (
        <div>
            ЛОГИН
            <div>
                <NavLink to="/student">Войти как ученик</NavLink>
            </div>
            <div>
                <NavLink to="/teacher">Войти как преподаватель</NavLink>
            </div>
        </div>
    )
}