import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'api/axiosConfig';

export const CreateNewCourse: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    timeToCompleteMinutes: '',
    about: '',
    forWho: '',
    requirements: '',
    categories: ['0'],
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert timeToCompleteMinutes to number
    const timeToCompleteMinutes = parseInt(formData.timeToCompleteMinutes, 10);
    const difficulty = parseInt(formData.difficulty, 10)
    // Convert categories to array of numbers
    const categories = formData.categories.map((category) => parseInt(category, 10));

    const dataToSend = {
      ...formData,
      difficulty,
      timeToCompleteMinutes,
      categories,
    };

    try {
      const response = await axiosInstance.post('/courses', dataToSend);
      setSuccess('Курс успешно создан!');
      setError(null);
      setTimeout(() => navigate(`/constructor/courses/${response.data.id}`), 2000);
    } catch (error) {
      setError('Ошибка при создании курса');
      console.error(error);
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl mt-6">
      <h1 className="text-3xl font-bold mb-6">Создать новый курс</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Название курса</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">Описание курса</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="difficulty" className="block text-gray-700">Сложность</label>
          <input
            type="number"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="timeToCompleteMinutes" className="block text-gray-700">Время на завершение (минуты)</label>
          <input
            type="text"
            id="timeToCompleteMinutes"
            name="timeToCompleteMinutes"
            value={formData.timeToCompleteMinutes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="about" className="block text-gray-700">О курсе</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="forWho" className="block text-gray-700">Для кого</label>
          <textarea
            id="forWho"
            name="forWho"
            value={formData.forWho}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-gray-700">Требования</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="categories" className="block text-gray-700">Категории</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories.join(', ')}
            onChange={(e) => setFormData({ ...formData, categories: e.target.value.split(', ') })}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Создать курс
        </button>
      </form>
    </div>
  );
};
