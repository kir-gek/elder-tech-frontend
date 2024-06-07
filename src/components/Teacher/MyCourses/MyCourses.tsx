import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "store/teacher-myCourses-reducer";
import AddCourseModal from "./AddCourseModal";

export const MyCourses = () => {
  const courses = useSelector(getCourses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCourse(id));
  };

  const handleNavigateToCourse = (course: any) => {
    navigate(`/course/${course.id}`, { state: { course } });
  };

  const coursesJSX = courses.map((el) => (
    <CoursesComponent
      key={el.id}
      id={el.id}
      title={el.title}
      description={el.description}
      category={el.category}
      difficulty={el.difficulty}
      rating={el.rating}
      onDelete={() => handleDelete(el.id)}
      onNavigate={() => handleNavigateToCourse(el)}
    />
  ));

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <div>
        <h3 className="text-xl font-semibold mb-4">Мои курсы</h3>
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
  title: string;
  description: string;
  category: string;
  difficulty: number;
  rating: number;
  onDelete: () => void;
  onNavigate: () => void;
}

const CoursesComponent = (props: CoursesComponentProps) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 mb-4">
      <button
        onClick={props.onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        &#10060;
      </button>
      <h4 className="text-xl font-semibold mb-2">Курс: {props.title}</h4>
      <p className="text-gray-700 mb-2">Описание курса: {props.description}</p>
      <p className="text-gray-700 mb-2">Категория: {props.category}</p>
      <p className="text-gray-700 mb-2">Сложность: {props.difficulty}</p>
      <p className="text-gray-700 mb-2">Рейтинг: {props.rating}</p>
      <button
        onClick={props.onNavigate}
        className="mt-4 bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      >
        Перейти на курс
      </button>
    </div>
  );
};
