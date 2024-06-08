// components/Test.tsx
import React from 'react';
import axiosInstance from 'api/axiosConfig';

export const Test: React.FC = () => {
  const handlePatchRequest = async () => {
    const userId = localStorage.getItem('currentID');

    if (!userId) {
      console.error('User ID is not available in localStorage');
      return;
    }

    try {
      const response = await axiosInstance.patch(`/users/${userId}`, {
        name: "Олеггггг",
        surname: "Олегов",
        patronymic: "Олегович",
        age: 9,
        gender: 0,
        phone: "1",
        email: "string"
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await axiosInstance.delete('/courses/3');
      console.log('Course deleted:', response.data);
    } catch (error) {
      console.error('Ошибка при удалении курса:', error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await axiosInstance.post('/courses/4/blocks', {
        number: 0,
        title: "Первый блок",
        description: "Описание"
      });
      console.log('Block added:', response.data);
    } catch (error) {
      console.error('Ошибка при добавлении блока:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePatchRequest}
      >
        Отправить PATCH запрос
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteRequest}
      >
        Удалить третий курс
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePostRequest}
      >
        Добавить блок в четвертый курс
      </button>
    </div>
  );
};
