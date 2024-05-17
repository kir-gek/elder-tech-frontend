import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UserModel } from "types/User";
import { getStudents, deleteStudent, addStudent } from "store/student-profile-reducer";

export const MyStudents = () => {
  const studentsState: UserModel[] = useSelector(getStudents);
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    surname: '',
    secondName: '',
    age: '',
    isMan: true,
  });

  const handleDelete = (id: number) => {
    dispatch(deleteStudent(id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddStudent = () => {
    const { name, surname, secondName, age } = newStudent;
    if (name && surname && secondName && age) {
      dispatch(addStudent({
        name,
        surname,
        secondName,
        age: Number(age),
        isMan: newStudent.isMan
      }));
      setNewStudent({ name: '', surname: '', secondName: '', age: '', isMan: true });
      setIsFormOpen(false);
    }
  };

  const students = studentsState.map((el, index) => (
    <tr key={el.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
      <td className="border px-4 py-2">{el.name}</td>
      <td className="border px-4 py-2">{el.surname}</td>
      <td className="border px-4 py-2">{el.secondName}</td>
      <td className="border px-4 py-2">{el.age}</td>
      <td className="border px-4 py-2">
        <button
          onClick={() => handleDelete(el.id)}
          className="text-red-500 hover:text-red-700"
        >
          &#10060;
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl" >
      <h3 className="text-2xl font-semibold mb-4">Мои студенты</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Имя</th>
              <th className="border px-4 py-2">Фамилия</th>
              <th className="border px-4 py-2">Отчество</th>
              <th className="border px-4 py-2">Возраст</th>
              <th className="border px-4 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </table>
      </div>
      <div className="mt-8">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isFormOpen ? 'Отменить' : 'Добавить студента'}
        </button>
        {isFormOpen && (
          <div className="mt-4 bg-white shadow-md rounded-lg p-4">
            <h4 className="text-xl font-semibold mb-2">Добавить нового студента</h4>
            <div className="mb-2">
              <label className="block text-gray-700">Имя:</label>
              <input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Фамилия:</label>
              <input
                type="text"
                name="surname"
                value={newStudent.surname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Отчество:</label>
              <input
                type="text"
                name="secondName"
                value={newStudent.secondName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Возраст:</label>
              <input
                type="number"
                name="age"
                value={newStudent.age}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Пол:</label>
              <select
                name="isMan"
                value={newStudent.isMan ? 'true' : 'false'}
                onChange={(e) => setNewStudent({ ...newStudent, isMan: e.target.value === 'true' })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="true">Мужчина</option>
                <option value="false">Женщина</option>
              </select>
            </div>
            <button
              onClick={handleAddStudent}
              className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >
              Добавить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
