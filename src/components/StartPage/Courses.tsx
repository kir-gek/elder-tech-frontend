import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "api/axiosConfig";

interface Course {
  id: number;
  title: string;
  description: string;
}

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      let courseId = 3;
      const coursesData: Course[] = [];

      while (true) {
        try {
          const response = await axiosInstance.get(`/courses/${courseId}`);
          console.log(
            `Успешный GET-запрос для курса ${courseId}:`,
            response.data
          );
          coursesData.push(response.data);
          courseId += 1;
        } catch (error:any) {
          if (error.response && error.response.status === 404) {
            console.log(`Курс с ID ${courseId} не найден (404).`);
            break;
          } else {
            console.error(
              `Ошибка при выполнении GET-запроса для курса ${courseId}:`,
              error
            );
            break;
          }
        }
      }

      setCourses(coursesData);
      setLoading(false);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
