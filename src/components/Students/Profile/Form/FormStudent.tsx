import { useDispatch } from "react-redux";
import s from "./Form.module.css";
import { changeInfoStudent } from "../../../../redux/student-profile-reducer";
import { UserModel } from "../../../../types/User";

type FormStudentProps = Pick<
  UserModel,
  "name" | "surname" | "secondName" | "age"
> & {
  studentId: number;
  formActive: boolean;
  setFormActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormStudent = ({
  studentId,
  name,
  surname,
  secondName,
  age,
  formActive,
  setFormActive,
}: FormStudentProps) => {
  const dispatch = useDispatch();

  const closeForm = () => {
    setFormActive(false);
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    //объект event доступен внутри колбэк функции
    dispatch(
      changeInfoStudent({
        studentId,
        item: event.target.id,
        newValue: event.target.value,
      })
    );
  };

  if (formActive) {
    return (
      <div className={s.formYes}>
        Имя:<input value={name} id="name" onChange={change}></input> <p></p>
        Фамилия:
        <input value={surname} id="surname" onChange={change}></input> <p></p>
        Отчество:
        <input
          value={secondName}
          id="secondName"
          onChange={change}
        ></input>{" "}
        <p></p>
        Возраст:<input value={age} id="age" onChange={change}></input> <p></p>
        <button onClick={closeForm}>Закрыть редактирование</button>
      </div>
    );
  }
};
