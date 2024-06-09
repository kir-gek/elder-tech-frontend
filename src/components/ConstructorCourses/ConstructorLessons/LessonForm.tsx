import React, { useState } from "react";

interface LessonFormProps {
  onSubmit: (lesson: Omit<Lesson, "id" | "course_block_id">) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit }) => {
  const [newLesson, setNewLesson] = useState<Omit<Lesson, "id" | "course_block_id">>({
    number: 0,
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewLesson({
      ...newLesson,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newLesson);
    setNewLesson({ number: 0, title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Номер урока
        </label>
        <input
          type="number"
          name="number"
          value={newLesson.number}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Название урока
        </label>
        <input
          type="text"
          name="title"
          value={newLesson.title}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Описание урока
        </label>
        <textarea
          name="description"
          value={newLesson.description}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Добавить урок
      </button>
    </form>
  );
};

export default LessonForm;
