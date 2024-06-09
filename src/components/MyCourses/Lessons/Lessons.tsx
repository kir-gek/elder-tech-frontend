import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosConfig";
import { CheckCircleIcon, ViewfinderCircleIcon } from '@heroicons/react/24/solid';

interface Lesson {
  id: number;
  course_block_id: number;
  number: number;
  title: string;
  description: string;
}

interface LessonsResponse {
  lessons: Lesson[];
}

export const Lessons = () => {
  const { id } = useParams<{ id: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get<LessonsResponse>(
          `/courses/blocks/${id}/lessons`
        );
        setLessons(response.data.lessons);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке уроков:", error);
      }
    };

    fetchLessons();
  }, [id]);

  const toggleLessonCompletion = (lessonId: number) => {
    setCompletedLessons((prevCompletedLessons) => {
      const newCompletedLessons = new Set(prevCompletedLessons);
      if (newCompletedLessons.has(lessonId)) {
        newCompletedLessons.delete(lessonId);
      } else {
        newCompletedLessons.add(lessonId);
      }
      return newCompletedLessons;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">Уроки</h1>
      {lessons.length === 0 ? (
        <p className="text-center">Уроки не найдены</p>
      ) : (
        lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white shadow-md rounded-lg p-6 mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
            <p className="text-gray-700 mb-2">{lesson.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                <span className="font-medium">Номер урока:</span>{" "}
                {lesson.number}
              </p>
              <button
                onClick={() => toggleLessonCompletion(lesson.id)}
                className="ml-4"
              >
                {completedLessons.has(lesson.id) ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <ViewfinderCircleIcon className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
