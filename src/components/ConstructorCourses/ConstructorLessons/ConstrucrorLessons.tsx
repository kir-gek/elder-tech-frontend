import React, { useState, useEffect } from "react";
import axiosInstance from "api/axiosConfig";
import { useParams } from "react-router-dom";
import LessonForm from "./LessonForm";

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

export const ConstructorLessons: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get<LessonsResponse>(`/courses/blocks/${id}/lessons`);
        setLessons(response.data.lessons);
      } catch (error) {
        console.error("Ошибка при загрузке уроков:", error);
      }
    };

    fetchLessons();
  }, [id]);

  const handleSubmitLesson = async (newLesson: Omit<Lesson, "id" | "course_block_id">) => {
    try {
      const response = await axiosInstance.post(`/courses/blocks/${id}/lessons`, {
        ...newLesson,
        number: Number(newLesson.number), // Приведение к типу number
      });
      setLessons([...lessons, response.data]);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Ошибка при добавлении урока:", error);
    }
  };

  const handleDeleteClick = async (lessonId: number) => {
    try {
      await axiosInstance.delete(`/courses/lessons/${lessonId}`);
      setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    } catch (error) {
      console.error("Ошибка при удалении урока:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6">Уроки</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mb-4"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Отмена" : "Добавить урок"}
      </button>
      {isFormVisible && <LessonForm onSubmit={handleSubmitLesson} />}
      {lessons.map((lesson) => (
        <div key={lesson.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
          <p className="text-gray-700 mb-2">{lesson.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              <span className="font-medium">Номер урока:</span> {lesson.number}
            </p>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => handleDeleteClick(lesson.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
