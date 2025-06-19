import "./App.css";
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
      <ModalWithForm />
      <Footer />
    </div>
  );
}

export default App;
