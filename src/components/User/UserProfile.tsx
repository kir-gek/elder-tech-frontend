import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUserProfile, selectUserLoading, selectUserError } from 'store/userSlice';
import { IRootState } from 'store/root-reducer';
import { Modal } from '../Modal/Modal';
import { EditUserProfileForm } from './EditUserProfileForm'; 

export const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => selectUserProfile(state));
  const loading = useSelector((state: IRootState) => selectUserLoading(state));
  const error = useSelector((state: IRootState) => selectUserError(state));
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {profile && (
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
      )}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <EditUserProfileForm profile={profile} onClose={() => setEditModalOpen(false)} />
      </Modal>
    </div>
  );
};
