import Photo from "assets/images/home-page-near-title.png";
export const StartPage = () => {
  return (
    <div>
      <div className="flex justify-around">
        <p className="">Образовательный проект для людей старшего возраста</p>
        <img className="h-32" src={Photo}></img>
      </div>
      <span>Здесь какой-то текст</span>
      <h3>Завлекающий текст</h3>
      <img className="img" />
      <div>
        <p>Тут кружки</p>
        Что я получу от этих курсов
        <p>Тут кружки</p>
      </div>
      <p>
        Для ознакомления с основными программами обучения вам необюходимо будет
        пройти курс по компьютерной грамотности
      </p>
    </div>
  );
};
