import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUserProfile, selectUserLoading, selectUserError } from 'store/userSlice';
import { IRootState } from 'store/root-reducer';
import { Modal } from '../Modal/Modal';
import { EditUserProfileForm } from './EditUserProfileForm';
import axiosInstance from 'api/axiosConfig';

export const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => selectUserProfile(state));
  const loading = useSelector((state: IRootState) => selectUserLoading(state));
  const error = useSelector((state: IRootState) => selectUserError(state));
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.image_id) {
      fetchAvatar(profile.image_id);
    }
  }, [profile]);

  const fetchAvatar = async (imageId: string) => {
    try {
      const response = await axiosInstance.get(`/images/${imageId}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      setAvatarUrl(url);
    } catch (error) {
      console.error('Ошибка при загрузке аватарки:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {profile && (
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0 flex flex-col items-center mt-4">
            <img
              className="h-36 w-36 rounded-full object-cover mb-4"
              src={avatarUrl || 'https://via.placeholder.com/150'}
              alt="User avatar"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline"
              onClick={() => alert('Изменить аватар')}
            >
              Изменить аватар
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Имя: </span>
                <span>{profile.name}</span>
              </div>
              <div>
                <span className="font-medium">Фамилия: </span>
                <span>{profile.surname}</span>
              </div>
              <div>
                <span className="font-medium">Отчество: </span>
                <span>{profile.patronymic}</span>
              </div>
              <div>
                <span className="font-medium">Возраст: </span>
                <span>{profile.age}</span>
              </div>
              <div>
                <span className="font-medium">Пол: </span>
                <span>{profile.gender === 0 ? 'Мужской' : 'Женский'}</span>
              </div>
              <div>
                <span className="font-medium">Телефон: </span>
                <span>{profile.phone}</span>
              </div>
              <div>
                <span className="font-medium">Email: </span>
                <span>{profile.email}</span>
              </div>
              <div>
                <span className="font-medium">Дата создания: </span>
                <span>{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setEditModalOpen(true)}
              >
                Редактировать
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <EditUserProfileForm profile={profile} onClose={() => setEditModalOpen(false)} />
      </Modal>
    </div>
  );
};

