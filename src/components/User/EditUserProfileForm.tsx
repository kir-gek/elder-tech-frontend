// components/EditUserProfileForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserModel } from 'types/User';
import { updateUserProfileLocally } from 'store/userSlice';

interface EditUserProfileFormProps {
  profile: UserModel;
  onClose: () => void;
}

export const EditUserProfileForm: React.FC<EditUserProfileFormProps> = ({ profile, onClose }) => {
  const [formData, setFormData] = useState<UserModel>(profile);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfileLocally(formData)); 
    onClose();
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
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};
