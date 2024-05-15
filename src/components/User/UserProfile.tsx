import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from 'api/axiosConfig';

export const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/users/1', {
          withCredentials: true
        });
        console.log(response.data)
        setProfile(response.data);
      } catch (error) {
        setError('Ошибка загрузки профиля: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {profile && (
        <div>
          <h1>Профиль пользователя</h1>
          {/* Отображение данных профиля */}
        </div>
      )}
    </div>
  );
};

