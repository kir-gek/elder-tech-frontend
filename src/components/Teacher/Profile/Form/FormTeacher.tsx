import { useDispatch } from "react-redux";
import s from "./Profile.module.css";
import { changeInfoTeacher } from "store/teacher-profile-reducer";
import { UserModel } from "types/User";

type FormPropsTeacher = Pick<
  UserModel,
  "name" | "surname" | "secondName" | "age"
> & {
  formActive: boolean;
  setFormActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FormTeacher = ({
  name,
  surname,
  secondName,
  age,
  formActive,
  setFormActive,
}: FormPropsTeacher) => {
  let formStyle = s.formNo;

  const dispatch = useDispatch();

  const closeForm = () => {
    setFormActive(false);
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
