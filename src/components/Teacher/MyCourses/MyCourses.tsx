import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  changeValueCourseForm,
  getCourses,
  getFormValueDescription,
  getFormValueName,
} from "../../../redux/teacher-myCourses-reducer";

export const MyCourses = () => {
  const courses = useSelector(getCourses);
  const formValueName = useSelector(getFormValueName);
  const formValueDescription = useSelector(getFormValueDescription);

  const dispatch = useDispatch();

  const addCourse = () => {
    dispatch(addNewCourse());
  };

  const changeNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let textName: string = formValueName;
    let textDescription: string = formValueDescription;
    event.target.id === "title"
      ? (textName = event.target.value)
      : (textDescription = event.target.value);
    dispatch(changeValueCourseForm({ textName, textDescription }));
  };

  const coursesJSX = courses.map((el) => (
    <CoursesComponent
      title={el.title}
      key={el.id}
      description={el.description}
    />
  ));

  return (
    <div>
      {coursesJSX}
      <div>
        <div>
          <h3>Добавление курса</h3>
        </div>
        Курс:
        <input
          value={formValueName}
          id="title"
          onChange={changeNewName}
        ></input>{" "}
        <p></p>
        Описание курса:
        <input
          value={formValueDescription}
          id="description"
          onChange={changeNewName}
        ></input>
        <p></p>
        <button onClick={addCourse}>Добавить курс</button>
      </div>
    </div>
  );
};

interface CoursesComponentProps {
  title: string;
  key: number;
  description: string;
}

const CoursesComponent = (props: CoursesComponentProps) => {
  return (
    <div>
      Курс: {props.title} <p></p>
      Описание курса: {props.description}
    </div>
  );
};
