import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  changeValueCourseForm,
  getFormValueName,
  getFormValueDescription,
  getFormValueCategory,
  getFormValueDifficulty,
  getFormValueRating,
} from "store/teacher-myCourses-reducer";

interface AddCourseModalProps {
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const formValueName = useSelector(getFormValueName);
  const formValueDescription = useSelector(getFormValueDescription);
  const formValueCategory = useSelector(getFormValueCategory);
  const formValueDifficulty = useSelector(getFormValueDifficulty);
  const formValueRating = useSelector(getFormValueRating);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    const actionPayload = {
      textName: id === "title" ? value : formValueName,
      textDescription: id === "description" ? value : formValueDescription,
      textCategory: id === "category" ? value : formValueCategory,
      difficulty: id === "difficulty" ? parseInt(value) : formValueDifficulty,
      rating: id === "rating" ? parseInt(value) : formValueRating,
    };

    dispatch(changeValueCourseForm(actionPayload));
  };

  const addCourse = () => {
    dispatch(addNewCourse());
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Добавление курса</h2>
        <label htmlFor="title" className="block mb-2">
          Курс:
          <input
            type="text"
            id="title"
            value={formValueName}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label htmlFor="description" className="block mb-2">
          Описание курса:
          <input
            type="text"
            id="description"
            value={formValueDescription}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label htmlFor="category" className="block mb-2">
          Категория:
          <select
            id="category"
            value={formValueCategory}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="Языки">Языки</option>
            <option value="Программирование">Программирование</option>
            <option value="Психология">Психология</option>
            <option value="Общее">Общее</option>
            <option value="Вязание">Вязание</option>
            <option value="Шахматы">Шахматы</option>
            <option value="Готовка">Готовка</option>
            <option value="Стройка и ремонт">Стройка и ремонт</option>
            <option value="Компьютерная грамотность">
              Компьютерная грамотность
            </option>
          </select>
        </label>
        <label htmlFor="difficulty" className="block mb-2">
          Сложность:
          <input
            type="number"
            id="difficulty"
            value={formValueDifficulty}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label htmlFor="rating" className="block mb-2">
          Рейтинг:
          <input
            type="number"
            id="rating"
            value={formValueRating}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Отмена
          </button>
          <button
            onClick={addCourse}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Добавить курс
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
