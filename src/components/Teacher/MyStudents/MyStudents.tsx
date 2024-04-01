import { useSelector } from "react-redux";
import s from "./MyStudents.module.css";
import { UserModel } from "../../../types/User";
import { IRootState } from "../../../redux/root-reducer";

export const MyStudents = () => {
  const studentsState: UserModel[] = useSelector(
    (state:IRootState) => state.studentProfile.students
  );

  const students = studentsState.map((el) => (
    <tr key={el.id}>
      <td>{el.name}</td>
      <td>{el.surname}</td>
      <td>{el.secondName}</td>
      <td>{el.age}</td>
    </tr>
  ));

  return (
    <div className={s.tableContainer}>
      <h3>Мои студенты</h3>
      <div className={s.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Возраст</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </table>
      </div>
    </div>
  );
};
