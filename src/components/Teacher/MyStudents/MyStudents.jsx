import s from './MyStudents.module.css'

export const MyStudents = (props) => {
    const students = props.students.map(el => (
        <tr key={el.id}>
            <td>{el.name}</td>
            <td>{el.surname}</td>
            <td>{el.secondName}</td>
            <td>{el.age}</td>
        </tr>
    ));
    return (
        <div className={s.tableContainer}>
            <h3>Мои студенты</h3>
            <div className={s.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                            <th>Возраст</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const Student = (props) => {
    return (
        <div>
            Имя: {props.name};
            Фамилия: {props.surname};
            Отчество: {props.secondName};
            Возраст: {props.age};
        </div>
    )
}