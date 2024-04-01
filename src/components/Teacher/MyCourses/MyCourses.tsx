import { useDispatch, useSelector } from "react-redux";
import { CourseModel } from "../../../types/Course";
import {
  addNewCourse,
  changeValueCourseForm,
} from "../../../Redux/teacher-myCourses-reducer";

export const MyCourses = () => {
  const courses: CourseModel[] = useSelector(
    (state) => state.teacherMyCourses.courses
  );

  const newCourse: string = useSelector(
    (state) => state.teacherMyCourses.formValueName
  );
  const newDescription: string = useSelector(
    (state) => state.teacherMyCourses.formValueDescription
  );

  const dispatch = useDispatch();

  const addCourse = () => {
    dispatch(addNewCourse());
  };

  const changeNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let textName:string = newCourse;
    let textDescription:string = newDescription;
    event.target.id === "title"
      ? (textName = event.target.value)
      : (textDescription = event.target.value);
    dispatch(changeValueCourseForm({textName, textDescription}));
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
          value={newCourse}
          id="title"
          onChange={changeNewName}
        ></input>{" "}
        <p></p>
        Описание курса:
        <input
          value={newDescription}
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
