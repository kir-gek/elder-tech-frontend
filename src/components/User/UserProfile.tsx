import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://45.80.69.116:8080/api/v1/courses/1', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          },
          withCredentials: true
        });
        console.log(response.data);
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

