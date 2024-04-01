import { useDispatch, useSelector } from "react-redux";
import { FormStudent } from "./Form/FormStudent";
import {
  selectStudentById,
  setFormActiveStudent,
} from "../../../Redux/student-profile-reducer";
import { UserModel } from "../../../types/User";

interface StudentProfileProps {
  studentId: number;
}

export const StudentProfile = ({ studentId }: StudentProfileProps) => {
  
  const student: UserModel = useSelector(selectStudentById(studentId)); //??? ошибка  хук реакт-редакс позволяет получать данные из состояния
  const formActive: boolean = useSelector(
    (state) => state.studentProfile.formActive
  ); //// как то написал но не понял как это работает

  const dispatch = useDispatch(); //хук реакт-редакс позваоляет получать диспатчи

  const openForm = () => {
    dispatch(setFormActiveStudent(true));
  };

  return (
    <div>
      <h3>Профиль студента</h3>
      Имя: {student.name} <p></p>
      Фамилия: {student.surname} <p></p>
      Отчество: {student.secondName} <p></p>
      Возраст: {student.age} <p></p>
      <button onClick={openForm}>редактировать данные</button>
      <FormStudent
        name={student.name}
        surname={student.surname}
        secondName={student.secondName}
        age={student.age}
        formActive={formActive}
        studentId={studentId}
      />
    </div>
  );
};
