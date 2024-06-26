import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'api/axiosConfig';

interface CourseBlock {
  id: number;
  course_id: number;
  number: number;
  title: string;
  description: string;
}

interface Course {
  id: number;
  author_id: number;
  title: string;
  description: string;
  difficulty: number;
  time_to_complete_hours: number;
  about: string;
  for_who: string;
  created_at: string;
  updated_at: string;
  requirements: string;
  rating: number;
  progress: number;
  cover_image: number;
  categories: number[];
  course_blocks: CourseBlock[];
}

interface CoursesResponse {
  courses: Course[];
}

export const ConstructorCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const currentID = localStorage.getItem('currentID');
      if (!currentID) {
        setError('User ID is not available in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get<CoursesResponse>(`/courses/author/${currentID}`);
        setCourses(response.data.courses);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError('Ошибка при загрузке курсов');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Ваши авторские курсы</h1>
      <button
        onClick={() => navigate('/constructor/create-course')}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mb-6"
      >
        Создать новый курс
      </button>
      {courses.length === 0 ? (
        <p>У вас еще нет созданных курсов.</p>
      ) : (
        <div className="space-y-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <div className="space-y-2">
                <p><span className="font-medium">Сложность:</span> {course.difficulty}</p>
                <p><span className="font-medium">Время на завершение (часы):</span> {course.time_to_complete_hours}</p>
                <p><span className="font-medium">О курсе:</span> {course.about}</p>
                <p><span className="font-medium">Для кого:</span> {course.for_who}</p>
                <p><span className="font-medium">Требования:</span> {course.requirements}</p>
                <p><span className="font-medium">Создан:</span> {new Date(course.created_at).toLocaleDateString()}</p>
                <p><span className="font-medium">Обновлен:</span> {new Date(course.updated_at).toLocaleDateString()}</p>
                <button
                  onClick={() => navigate(`/constructor/courses/${course.id}`)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Перейти в курс
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
