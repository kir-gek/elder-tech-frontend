import Logo from "../../assets/images/logo.png"
import Login from "../../assets/images/login.png"
import s from "./Header.module.css"
export const Header = () =>{
    return (
        <div className = {s.Header}>
            <img src={Logo} />
            Версия для слабовидящих
            <img src={Login} />

        </div>
    )
}



