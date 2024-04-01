import { useDispatch, useSelector } from "react-redux";
import { UserModel } from "../../../types/User";
import { setFormActiveTeacher } from "../../../Redux/teacher-profile-reducer";
import { FormTeacher } from "./Form/FormTeacher";

export const TeacherProfile = () => {
  const teacher: UserModel = useSelector(
    (state) => state.teacherProfile.teacher
  );

  const formActive: boolean = useSelector(
    (state) => state.teacherProfile.formActive
  );

  const dispatch = useDispatch();

  const openForm = () => {
    dispatch(setFormActiveTeacher(true));
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
      />
    </div>
  );
};
