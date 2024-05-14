import { useSelector } from "react-redux";
import { UserModel } from "types/User";
import { getStudents } from "store/student-profile-reducer";

export const MyStudents = () => {
  const studentsState: UserModel[] = useSelector(getStudents);

  const students = studentsState.map((el, index) => (
    <tr key={el.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
      <td className="border px-4 py-2">{el.name}</td>
      <td className="border px-4 py-2">{el.surname}</td>
      <td className="border px-4 py-2">{el.secondName}</td>
      <td className="border px-4 py-2">{el.age}</td>
    </tr>
  ));

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-4">Мои студенты</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Имя</th>
              <th className="border px-4 py-2">Фамилия</th>
              <th className="border px-4 py-2">Отчество</th>
              <th className="border px-4 py-2">Возраст</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </table>
      </div>
    </div>
  );
}