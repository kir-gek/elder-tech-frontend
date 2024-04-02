import { useSelector } from "react-redux";
import { FormStudent } from "./Form/FormStudent";
import { useState } from "react";
import { UserModel } from "types/User";
import { selectStudentById } from "store/student-profile-reducer";

interface StudentProfileProps {
  studentId: number;
}

export const StudentProfile = ({ studentId }: StudentProfileProps) => {
  const [formActive, setFormActive] = useState<boolean>(false);

  const student: UserModel | undefined = useSelector(
    selectStudentById(studentId)
  );

  const openForm = () => {
    setFormActive(true);
  };

  return (
    <>
      {student ? (
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
            studentId={studentId}
            formActive={formActive}
            setFormActive={setFormActive}
          />
        </div>
      ) : (
        <div>
          <h2>Профиля нет</h2>
        </div>
      )}
    </>
  );
};
