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
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Профиль студента</h3>
          <div className="mb-4">
            <p><span className="font-semibold">Имя:</span> {student.name}</p>
            <p><span className="font-semibold">Фамилия:</span> {student.surname}</p>
            <p><span className="font-semibold">Отчество:</span> {student.secondName}</p>
            <p><span className="font-semibold">Возраст:</span> {student.age}</p>
          </div>
          <button
            onClick={openForm}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Редактировать данные
          </button>
          {formActive && (
            <FormStudent
              name={student.name}
              surname={student.surname}
              secondName={student.secondName}
              age={student.age}
              studentId={studentId}
              formActive={formActive}
              setFormActive={setFormActive}
            />
          )}
        </div>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Профиля нет</h2>
        </div>
      )}
    </>
  );
};
