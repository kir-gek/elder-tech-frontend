import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, fetchUserCourses } from "store/myCourses-reducer";
import { useNavigate } from "react-router-dom";
import { selectUserName, selectUserPatronymic } from "store/userSlice";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

// import AddCourseModal from "./AddCourseModal";

export const MyCourses = () => {
  const dispatch = useDispatch();
  

  const userName = useSelector(selectUserName);
  const userPatronymic = useSelector(selectUserPatronymic);

  useEffect(() => {
    dispatch(fetchUserCourses()); // Выполняем действие при загрузке компонента
  }, [dispatch]);

  const courses = useSelector(getCourses);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/courses');
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
        <h3 className="text-xl font-semibold mb-4">Посмотрите новые курсы в галерее курсов</h3>
        <div>
          <button
            className="block w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleNavigate}
          >
            Перейти в галерию курсов
          </button>
        </div>
      </div>
      
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
      <p className="text-gray-700 mb-4">Описание курса: {props.description}</p>
      
      <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Детали курса</span>
                <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <p className="mb-2"><span className="font-medium">Сложность:</span> {props.difficulty}</p>
                <p className="mb-2"><span className="font-medium">Время на завершение:</span> {props.time_to_complete_hours} минут</p>
                <p className="mb-2"><span className="font-medium">Для кого:</span> {props.for_who}</p>
                <p className="mb-2"><span className="font-medium">Автор ID:</span> {props.author_id}</p>
                <p className="mb-2"><span className="font-medium">Описание:</span> {props.about}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <button
        onClick={handleNavigate}
        className="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Перейти в курс
      </button>
    </div>
  );
};
