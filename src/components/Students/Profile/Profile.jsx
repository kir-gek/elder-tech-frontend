export const StudentProfile = (props) =>{
    return(
        <div>
            <h3>Профиль студента</h3> 
            Имя: {props.name} <p></p>
            Фамилия: {props.surname} <p></p>
            Отчество: {props.secondName} <p></p>
            Возраст: {props.age}
        </div>
    )
}