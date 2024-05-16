import Photo from "assets/images/home-page-near-title.png";
import Description from "assets/images/Desciption.svg"
import { NavLink } from "react-router-dom";
import axiosInstance from "api/axiosConfig";
export const StartPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-around items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Образовательный проект для людей старшего возраста
        </h1>
        <img className="h-64" src={Photo} alt="Фото" />
      </div>
      <NavLink to="/courses" className="relative py-2 px-4 bg-green-500 text-white font-medium rounded-lg pr-20">
  Посмотреть курсы
  <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
    <div className="w-6 h-6 bg-white rounded-full flex justify-center items-center text-green-500 font-semibold mr-5">  </div>
  </div>
</NavLink>


      <img
        className="w-full mt-4 rounded-lg "
        src={Description}
        alt="Изображение"
      />
      <div className="mt-8">
        <p className="text-lg text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          scelerisque suscipit nulla, nec suscipit libero molestie ac.
          Vestibulum nec ex turpis.
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Что я получу от этих курсов
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Duis vitae enim eget turpis tincidunt volutpat. Donec nec ex sit amet
          urna iaculis lacinia. Proin et metus ut ligula feugiat hendrerit sed
          quis risus.
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-4">Тут кружки</p>
        <p className="text-lg text-gray-600 mb-4">
          Morbi eget nisl vel dolor finibus dapibus id in libero. Sed vitae quam
          condimentum, lacinia ligula ut, rhoncus mi. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae.
        </p>
      </div>
      <p className="text-lg text-gray-600 mt-8">
        Для ознакомления с основными программами обучения вам необходимо будет
        пройти курс по компьютерной грамотности
      </p>
      <PostButton />
    </div>
  );
};








// ЗДЕСЬ ДЛЛЯ ТОГО ЧТОБ ЧЕКАТЬ ЗАПРОСЫ
const PostButton: React.FC = () => {
  const handleClick = async () => {
    const dataCourse = {
      title: "Введение в веб-разработку",
      description: "Изучите основы веб-разработки с нуля",
      difficulty: 2,
      timeToCompleteMinutes: 240,
      about: "Этот курс охватывает основы HTML, CSS и JavaScript.",
      forWho: "Новички в веб-разработке",
      requirements: "Нет необходимости в предварительном опыте программирования",
      categories: [1] 
    };

    try {
      const otvet = await axiosInstance.post('/courses', dataCourse);
      console.log('Успешный POST-запрос с ответом:', otvet.data);
    } catch (ошибка) {
      console.error('Ошибка при выполнении POST-запроса:', ошибка);
    }
  };

  return (
    <button onClick={handleClick}>Создать курс</button>
  );
};