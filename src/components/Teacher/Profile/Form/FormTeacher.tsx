import { useDispatch } from "react-redux";
import s from "./Profile.module.css";
import {
  changeInfoTeacher,
  setFormActiveTeacher,
} from "../../../../Redux/teacher-profile-reducer";

interface FormPropsTeacher {
  name: string;
  surname: string;
  secondName: string;
  age: number;
  formActive: boolean;
}
export const FormTeacher = ({
  name,
  surname,
  secondName,
  age,
  formActive,
}: FormPropsTeacher) => {
  let formStyle = s.formNo;

  const dispatch = useDispatch();

  const closeForm = () => {
    dispatch(setFormActiveTeacher(false));
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    //объект event доступен внутри колбэк функции
    let newValue = event.target.value;
    const item = event.target.id;
    dispatch(changeInfoTeacher({ item, newValue }));
  };

  return (
    <div
      className={formActive ? (formStyle = s.formYes) : (formStyle = s.formNo)}
    >
      Имя:<input value={name} id="name" onChange={change}></input> <p></p>
      Фамилия:
      <input value={surname} id="surname" onChange={change}></input> <p></p>
      Отчество:
      <input value={secondName} id="secondName" onChange={change}></input>{" "}
      <p></p>
      Возраст:<input value={age} id="age" onChange={change}></input> <p></p>
      <button onClick={closeForm}>Закрыть редактирование</button>
    </div>
  );
};
