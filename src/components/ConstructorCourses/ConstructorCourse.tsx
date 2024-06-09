import React, { useEffect, useState } from 'react';
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
      <h1 className="text-3xl font-bold mb-6">Ваши курсы</h1>
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
                <p><span className="font-medium">Рейтинг:</span> {course.rating}</p>
                <p><span className="font-medium">Прогресс:</span> {course.progress}%</p>
                <p><span className="font-medium">Создан:</span> {new Date(course.created_at).toLocaleDateString()}</p>
                <p><span className="font-medium">Обновлен:</span> {new Date(course.updated_at).toLocaleDateString()}</p>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Блоки курса:</h3>
                  {course.course_blocks && course.course_blocks.length > 0 ? (
                    course.course_blocks.map(block => (
                      <div key={block.id} className="border-t border-gray-200 pt-2 mt-2">
                        <h4 className="font-medium">{block.title}</h4>
                        <p>{block.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Блоки курса еще не добавлены</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
