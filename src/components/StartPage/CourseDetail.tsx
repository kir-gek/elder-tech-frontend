import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from 'api/axiosConfig'; // Путь к вашему файлу axiosInstance

interface Course {
  id: number;
  title: string;
  description: string;
  about: string;
  author_id: number;
  categories: number[];
  course_blocks: { title: string }[];
  difficulty: number;
  for_who: string;
  requirements: string;
  time_to_complete_hours: number;
}

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при выполнении GET-запроса для курса:', error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleJoinCourse = async () => {
    try {
      await axiosInstance.post(`/courses/${id}/join`, { course_id: id });
      setIsJoined(true);
      console.log('Вы успешно записались на курс');
    } catch (error) {
      console.error('Ошибка при выполнении POST-запроса для записи на курс:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (!course) {
    return <div className="text-center py-8 text-red-500 font-bold text-xl">Курс не найден</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-700 mb-4"><strong>Описание:</strong> {course.description}</p>
        <p className="text-gray-700 mb-4"><strong>О курсе:</strong> {course.about}</p>
        <p className="text-gray-700 mb-4"><strong>Для кого:</strong> {course.for_who}</p>
        <p className="text-gray-700 mb-4"><strong>Требования:</strong> {course.requirements}</p>
        <p className="text-gray-700 mb-4"><strong>Категории:</strong> {course.categories.join(', ')}</p>
        <p className="text-gray-700 mb-4"><strong>Сложность:</strong> {course.difficulty}</p>
        <p className="text-gray-700 mb-4"><strong>Время на прохождение (часов):</strong> {course.time_to_complete_hours}</p>
        <div className="mb-4">
          <strong>Блоки курса:</strong>
          {course.course_blocks && course.course_blocks.length > 0 ? (
            <ul className="list-disc pl-5">
              {course.course_blocks.map((block, index) => (
                <li key={index} className="text-gray-700">{block.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Нет доступных блоков курса</p>
          )}
        </div>
        {!isJoined ? (
          <button
            onClick={handleJoinCourse}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Записаться на курс
          </button>
        ) : (
          <div className="text-green-500 font-bold">Вы успешно записались на курс</div>
        )}
      </div>
    </div>
  );
};
