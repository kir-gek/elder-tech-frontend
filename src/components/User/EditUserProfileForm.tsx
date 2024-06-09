import React, { useState } from 'react';
import axiosInstance from 'api/axiosConfig';
import { UserModel } from 'types/User';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from 'store/userSlice';
import { AppDispatch } from 'store/store';

interface EditUserProfileFormProps {
  profile: any;
  onClose: () => void;
}

export const EditUserProfileForm: React.FC<EditUserProfileFormProps> = ({ profile, onClose }) => {
  const [formData, setFormData] = useState<UserModel>(profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem('currentID');

    if (!userId) {
      console.error('User ID is not available in localStorage');
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.patch(`/users/${userId}`, {
        name: formData.name,
        surname: formData.surname,
        patronymic: formData.patronymic,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email
      });

      dispatch(fetchUserProfile()); // Обновить профиль пользователя
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      // Здесь можно добавить обработку ошибок, например, показать сообщение пользователю
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Редактировать профиль</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Имя</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Фамилия</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Отчество</label>
          <input
            type="text"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Возраст</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Пол</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          >
            <option value={1}>Мужской</option>
            <option value={0}>Женский</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Телефон</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
};
