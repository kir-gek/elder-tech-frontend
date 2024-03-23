export const MyCourses = (props) => {

    const addCourse = () => {
        props.addCourse()
    }


    const changeNewName = (event) =>{
        let name= props.newCourse;
        let description = props.newDescription;
        (event.target.id === 'title')? name = event.target.value : description = event.target.value
        props.changeValueForm(name, description)
    }

    const courses = props.courses.map(el => (<CoursesComponent title={el.title} key={el.id} description={el.description} />))
    return (
        <div>
            {courses}
            <div> 
                <div>
                      <h3>Добавление курса</h3>
                </div>
                Курс:<input value={props.newCourse} id='title' onChange={changeNewName}></input> <p></p>
                Описание курса:<input value={props.newDescription} id='description' onChange={changeNewName}></input><p></p>

                <button onClick={addCourse} >Добавить курс</button>
            </div>
        </div>
    )
}

const CoursesComponent = (props) => {
    return (
        <div>
            Курс: {props.title} <p></p>
            Описание курса: {props.description}
        </div>
    )
}