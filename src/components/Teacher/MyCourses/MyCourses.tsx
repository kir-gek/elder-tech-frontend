import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  changeValueCourseForm,
  getCourses,
  getFormValueDescription,
  getFormValueName,
} from "store/teacher-myCourses-reducer";

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
    <div className="max-w-lg mx-auto p-6">
    <div>
      <h3 className="text-xl font-semibold mb-4">Мои курсы</h3>
      {coursesJSX}
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Добавление курса</h3>
      <div>
        <label htmlFor="title" className="block mb-2">
          Курс:
          <input
            type="text"
            id="title"
            value={formValueName}
            onChange={changeNewName}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label htmlFor="description" className="block mb-2">
          Описание курса:
          <input
            type="text"
            id="description"
            value={formValueDescription}
            onChange={changeNewName}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <button
          onClick={addCourse}
          className="block w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Добавить курс
        </button>
      </div>
    </div>
  </div>  );
};

interface CoursesComponentProps {
  title: string;
  key: number;
  description: string;
}

const CoursesComponent = (props: CoursesComponentProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h4 className="text-xl font-semibold mb-2">Курс: {props.title}</h4>
    <p className="text-gray-700 mb-2">Описание курса: {props.description}</p>
  </div>
  );
};
