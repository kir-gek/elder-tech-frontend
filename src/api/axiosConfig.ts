import axios from 'axios';

// Создаем экземпляр Axios
const axiosInstance = axios.create({
    withCredentials: true,
  baseURL: 'https://45.80.69.116/api/v1',
});

// Добавляем интерсептор для добавления токена в заголовки запросов
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем интерсептор для обработки ответов
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log('Ошибка ответа:', error.response.status);
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Перенаправляем на страницу логина
      }
    } else if (error.request) {
      console.log('Ошибка запроса:', error.request);
    } else {
      console.log('Ошибка:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
