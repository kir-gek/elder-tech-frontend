import s from "./Profile.module.css"

export const StudentProfile = (props) => {

    let form = s.formNo

    const openForm = () => {
        props.activeForm()
    }

    const closeForm = () => {

        props.passiveForm()
    }

    const change = (event) => { //объект event доступен внутри колбэк функции
        let newValue = event.target.value
        const item = "name"
        props.changeInfo(item, newValue)
    }



    return (
        <div>
            <h3>Профиль студента</h3>
            Имя: {props.name} <p></p>
            Фамилия: {props.surname} <p></p>
            Отчество: {props.secondName} <p></p>
            Возраст: {props.age} <p></p>
            <button onClick={openForm}>редактировать данные</button>
            <form className={props.formActive ? form = s.formYes : form = s.formNo}>
                Имя:<input value={props.name} onChange={change}></input> <p></p>
                Фамилия:<input value={props.surname}></input> <p></p>
                Отчество:<input value={props.secondName}></input> <p></p>
                Возраст:<input value={props.age}></input> <p></p>
                <button onClick={closeForm}>Закрыть редактирование</button>
            </form>
        </div>
    )
}