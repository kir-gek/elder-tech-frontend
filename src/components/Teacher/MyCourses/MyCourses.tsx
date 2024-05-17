// MyCourses.tsx

import { useState } from "react";
import { useSelector } from "react-redux";
import { getCourses } from "store/teacher-myCourses-reducer";
import AddCourseModal from "./AddCourseModal";

export const MyCourses = () => {
  const courses = useSelector(getCourses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const coursesJSX = courses.map((el) => (
    <CoursesComponent
      title={el.title}
      key={el.id}
      description={el.description}
      category={el.category}
      difficulty={el.difficulty}
      rating={el.rating}
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
  title: string;
  key: number;
  description: string;
  category: string;
  difficulty: number;
  rating: number;
}

const CoursesComponent = (props: CoursesComponentProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h4 className="text-xl font-semibold mb-2">Курс: {props.title}</h4>
      <p className="text-gray-700 mb-2">Описание курса: {props.description}</p>
      <p className="text-gray-700 mb-2">Категория: {props.category}</p>
      <p className="text-gray-700 mb-2">Сложность: {props.difficulty}</p>
      <p className="text-gray-700 mb-2">Рейтинг: {props.rating}</p>
    </div>
  );
};
