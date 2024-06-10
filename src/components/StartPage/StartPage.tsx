import Photo from "assets/images/home-page-near-title.png";
import Description from "assets/images/Desciption.svg";
import { NavLink } from "react-router-dom";

export const StartPage = () => {
  return (
    <div className="container-fluid px-0">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:justify-around mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 md:w-1/2 md:mr-4">
            Образовательный проект для людей старшего возраста
          </h1>
          <img className="h-auto md:h-64 rounded-lg md" src={Photo} alt="Фото" />
        </div>
        <NavLink
          to="/courses"
          className="relative py-2 px-4 bg-green-500 text-white font-medium rounded-lg text-center hover:bg-green-600 transition duration-300"
        >
          Посмотреть курсы
        </NavLink>
        <img
          className="w-full mt-8 rounded-lg"
          src={Description}
          alt="Изображение"
        />
        <div className="mt-8">
          <h1 className="font-bold text-gray-800 mb-4 text-center md:text-left">
            Для ознакомления с основными программами обучения вам необходимо
            будет пройти вводный курс по компьютерной грамотности
          </h1>

          <div
            className="w-full mx-auto bg-white rounded-lg overflow-hidden"
            style={{
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
            }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Вводный курс по компьютерной грамотности
              </h2>
              <p className="text-gray-600 mb-4">
                Это онлайн-курс, в котором шаг за шагом разбираются различные
                аспекты работы в цифровой среде.
              </p>
              <div className="flex justify-between items-end">
                <div className="text-lg text-gray-800 mb-2">Базовый</div>
                <button className="text-lg text-white bg-green-500 font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                  Начать
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-around">
            <div className="bg-blue-300 rounded-lg p-4 m-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Базовая психология
              </h2>
            </div>
            <div className="bg-green-300 rounded-lg p-4 m-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Спорт и туризм
              </h2>
            </div>
            <div className="bg-yellow-300 rounded-lg p-4 m-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Творчество
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
