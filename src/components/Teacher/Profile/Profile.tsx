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
    <div>
      <h3>Профиль преподователя</h3>
      Имя: {teacher.name} <p></p>
      Фамилия: {teacher.surname} <p></p>
      Отчество: {teacher.secondName} <p></p>
      Возраст: {teacher.age} <p></p>
      <button onClick={openForm}>редактировать данные</button>
      <FormTeacher
        name={teacher.name}
        surname={teacher.surname}
        secondName={teacher.secondName}
        age={teacher.age}
        formActive={formActive}
        setFormActive={setFormActive}
      />
    </div>
  );
};
