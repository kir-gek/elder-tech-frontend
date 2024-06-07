import React from 'react';
import { useLocation } from 'react-router-dom';

export const CoursePage: React.FC = () => {
  const location = useLocation();
  const course = location.state.course;

  const commonLessons = [
    { id: 1, title: 'Урок 1: Введение', content: 'Содержание урока 1...' },
    { id: 2, title: 'Урок 2: Основы', content: 'Содержание урока 2...' },
    { id: 3, title: 'Урок 3: Практика', content: 'Содержание урока 3...' },
  ];

  const specialLessons = [
    { id: 1, title: 'Урок 1: Введение в кулинарию', content: 'Основы кулинарии, важность правильного питания, обзор курса.' },
    { id: 2, title: 'Урок 2: Основные техники приготовления пищи', content: 'Изучение базовых техник приготовления пищи.' },
    { id: 3, title: 'Урок 3: Приготовление завтраков', content: 'Легкие и питательные завтраки.' },
    { id: 4, title: 'Урок 4: Супы и бульоны', content: 'Основы приготовления супов и бульонов.' },
    { id: 5, title: 'Урок 5: Основные блюда из мяса и птицы', content: 'Приготовление основных блюд из мяса и птицы.' },
    { id: 6, title: 'Урок 6: Рыба и морепродукты', content: 'Основы приготовления блюд из рыбы и морепродуктов.' },
    { id: 7, title: 'Урок 7: Вегетарианские блюда', content: 'Приготовление вкусных и питательных вегетарианских блюд.' },
    { id: 8, title: 'Урок 8: Выпечка и десерты', content: 'Основы выпечки и приготовление десертов.' },
    { id: 9, title: 'Урок 9: Салаты и закуски', content: 'Приготовление классических салатов, здоровые закуски...' },
    { id: 10, title: 'Урок 10: Планирование меню и закупки', content: 'Планирование недельного меню, составление списка покупок, экономия времени и денег при закупках...' },
  ];

  const lessons = course.id === 3 ? specialLessons : commonLessons;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl mt-16">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-6">{course.description}</p>
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
            <p className="text-gray-700">{lesson.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};