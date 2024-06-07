import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosConfig";

export const CoursePage = () => {
  const { id } = useParams();
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
    </div>
  );
};

