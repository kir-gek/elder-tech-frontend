import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      ElderTech
      <span>Здесь какой-то текст</span>
      <h3>Завлекающий текст</h3>
      <img className="img" />
      <div>
        <p>Тут кружки</p>
        Что я получу от этих курсов
        <p>Тут кружки</p>
      </div>
      <p>Для ознакомления с основными программами обучения вам необюходимо будет пройти курс по компьютерной грамотности</p>
      <Footer />
    </div>
  );
}

export default App;
