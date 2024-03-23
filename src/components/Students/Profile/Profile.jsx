import s from "./Profile.module.css"

export const StudentProfile = (props) => {

    const openForm = () => {
        props.activeForm()
    }

    return (
        <div>
            <h3>Профиль студента</h3>
            Имя: {props.name} <p></p>
            Фамилия: {props.surname} <p></p>
            Отчество: {props.secondName} <p></p>
            Возраст: {props.age} <p></p>
            <button onClick={openForm}>редактировать данные</button>
            <Form name={props.name} surname={props.surname} secondName={props.secondName} age={props.age} formActive={props.formActive}
                passiveForm={props.passiveForm} changeInfo={props.changeInfo} studentId={props.studentId}/>
        </div>
    )
}


const Form = (props) => {

    let formStyle = s.formNo;

    const closeForm = () => {

        props.passiveForm()
    }

    const change = (event) => { //объект event доступен внутри колбэк функции
        let newValue = event.target.value
        const item = event.target.id
        const studentID = props.studentId
        props.changeInfo(studentID, item, newValue)
    }

    return (
        <div className={props.formActive ? formStyle = s.formYes : formStyle = s.formNo}>
            Имя:<input value={props.name} id='name' onChange={change}></input> <p></p>
            Фамилия:<input value={props.surname} id='surname' onChange={change}></input> <p></p>
            Отчество:<input value={props.secondName} id='secondName' onChange={change}></input> <p></p>
            Возраст:<input value={props.age} id='age' onChange={change} ></input> <p></p>
            <button onClick={closeForm}>Закрыть редактирование</button>
        </div>
    )
}

