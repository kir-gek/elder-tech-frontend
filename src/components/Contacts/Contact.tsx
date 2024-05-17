import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to the server
    setFormStatus('Ваше сообщение отправлено!');
  };

  return (
    <div className="container mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Контакты</h1>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Добро пожаловать в ElderTech, ведущий образовательный проект для людей старшего возраста. Мы стремимся обеспечить комфортное и эффективное обучение в цифровой среде, предлагая разнообразные курсы и программы.
        </p>
        <p className="text-gray-700 mb-4">
          Наш адрес: Москва, Большая Семеновская 38. Мы находимся в удобном районе, легко доступном на общественном транспорте.
        </p>
        <p className="text-gray-700 mb-4">
          Если у вас есть какие-либо вопросы или предложения, пожалуйста, свяжитесь с нами, заполнив форму ниже. Мы всегда рады услышать от вас!
        </p>
      </div>
      
      <div className="mb-6">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Afaec5931b6f4c4b0f663e4c3621446e7b960f58b123e8b2b4f3b042e225a65d1&amp;source=constructor"
          width="100%"
          height="400"
          frameBorder="0"
          title="Яндекс.Карта"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Форма для обратной связи</h2>
        {formStatus && <p className="text-green-600 mb-4">{formStatus}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700">Сообщение</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

