import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "api/axiosConfig";
import { CourseModel } from "types/Course"; // Импорт модели курса

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>(); // Используем useParams с типизацией
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке курса:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleUnsubscribe = async () => {
    try {
      await axiosInstance.post(`/courses/${id}/leave`);
      navigate('/courses'); // Возвращаемся на страницу курсов после успешной отписки
    } catch (error) {
      console.error("Ошибка при отписке от курса:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (!course) {
    return <div className="text-center py-8">Курс не найден</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">Курс: {course.title}</h1>
      <p className="text-gray-700 mb-2">Описание курса: {course.description}</p>
      <p className="text-gray-700 mb-2">Сложность: {course.difficulty}</p>
      <p className="text-gray-700 mb-2">Время на завершение: {course.time_to_complete_hours} часов</p>
      <p className="text-gray-700 mb-2">Для кого: {course.for_who}</p>
      <p className="text-gray-700 mb-2">Автор ID: {course.author_id}</p>
      <p className="text-gray-700 mb-2">Описание: {course.about}</p>
      <button
        onClick={handleUnsubscribe}
        className="mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
      >
        Отписаться
      </button>
    </div>
  );
};

