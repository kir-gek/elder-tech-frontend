import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, fetchUserCourses } from "store/teacher-myCourses-reducer";
import { useNavigate } from "react-router-dom";
import { selectUserName, selectUserPatronymic } from "store/userSlice";

// import AddCourseModal from "./AddCourseModal";

export const MyCourses = () => {
  const dispatch = useDispatch();
  

  const userName = useSelector(selectUserName);
  const userPatronymic = useSelector(selectUserPatronymic);

  useEffect(() => {
    dispatch(fetchUserCourses()); // Выполняем действие при загрузке компонента
  }, [dispatch]);

  const courses = useSelector(getCourses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const coursesJSX = Array.isArray(courses.courses) ? courses.courses.map((el) => (
    <CoursesComponent      
      key={el.id}
      id={el.id}
      author_id={el.author_id}
      title={el.title}
      description={el.description}
      difficulty={el.difficulty}
      time_to_complete_hours={el.time_to_complete_hours}
      about={el.about}
      for_who={el.for_who}      
    />
  )) : <p>Курсы не найдены</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
       <div>
          <h3 className="text-4xl font-semibold text-center mb-6 text-gray-800">
            Здравствуйте, {userName} {userPatronymic}!
          </h3>
          <p className="text-lg font-semibold text-center mb-8 text-gray-700">
            Сегодня отличный день, чтобы продолжить обучение
          </p>
        </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Ваши курсы</h3>
        {coursesJSX}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Добавление курса</h3>
        <div>
          <button
            onClick={openModal}
            className="block w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Добавить курс
          </button>
        </div>
      </div>
      {isModalOpen && <AddCourseModal onClose={closeModal} />}
    </div>
  );
};

interface CoursesComponentProps {
  id: number;
  about: string;
  description: string;
  difficulty: number;
  for_who: string;
  title: string;
  time_to_complete_hours: number;
  author_id: number;
}

const CoursesComponent = (props: CoursesComponentProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/teacher/my-courses/${props.id}`);
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 mb-4">     
      <h4 className="text-xl font-semibold mb-2">Курс: {props.title}</h4>
      <p className="text-gray-700 mb-2">Описание курса: {props.description}</p>
      <p className="text-gray-700 mb-2">Сложность: {props.difficulty}</p>
      <p className="text-gray-700 mb-2">Время на завершение: {props.time_to_complete_hours} часов</p>
      <p className="text-gray-700 mb-2">Для кого: {props.for_who}</p>
      <p className="text-gray-700 mb-2">Автор ID: {props.author_id}</p>
      <p className="text-gray-700 mb-2">Описание: {props.about}</p>
      <button
        onClick={handleNavigate}
        className="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Перейти в курс
      </button>
    </div>
  );
};
