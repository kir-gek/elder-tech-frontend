import { useDispatch } from "react-redux";
import s from "./Form.module.css";
import { changeInfoStudent } from "store/student-profile-reducer";
import { UserModel } from "types/User";

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
      <label htmlFor="name" className="block mb-2">
        Имя:
        <input
          type="text"
          id="name"
          value={name}
          onChange={change}
          className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <label htmlFor="surname" className="block mb-2">
        Фамилия:
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={change}
          className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <label htmlFor="secondName" className="block mb-2">
        Отчество:
        <input
          type="text"
          id="secondName"
          value={secondName}
          onChange={change}
          className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <label htmlFor="age" className="block mb-2">
        Возраст:
        <input
          type="text"
          id="age"
          value={age}
          onChange={change}
          className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <button
        onClick={closeForm}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        Закрыть редактирование
      </button>
    </div>
    );
  }
};
