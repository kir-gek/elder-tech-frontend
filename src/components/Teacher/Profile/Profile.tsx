import { useSelector } from "react-redux";
import { UserModel } from "types/User";
import { FormTeacher } from "./Form/FormTeacher";
import { useState } from "react";
import { getTeacher } from "store/teacher-profile-reducer";

export const TeacherProfile = () => {
  const [formActive, setFormActive] = useState<boolean>(false);

  const teacher: UserModel = useSelector(getTeacher);

  const openForm = () => {
    setFormActive(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
    <h3 className="text-2xl font-semibold mb-4">Профиль преподавателя</h3>
    <div className="mb-4">
      <p><span className="font-semibold">Имя:</span> {teacher.name}</p>
      <p><span className="font-semibold">Фамилия:</span> {teacher.surname}</p>
      <p><span className="font-semibold">Отчество:</span> {teacher.secondName}</p>
      <p><span className="font-semibold">Возраст:</span> {teacher.age}</p>
    </div>
    <button
      onClick={openForm}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
    >
      Редактировать данные
    </button>
    {formActive && (
      <FormTeacher
        name={teacher.name}
        surname={teacher.surname}
        secondName={teacher.secondName}
        age={teacher.age}
        formActive={formActive}
        setFormActive={setFormActive}
      />
    )}
  </div>

  );
};
