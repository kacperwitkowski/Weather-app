import cloud from "./img/cloud.png";
import rain from "./img/rain.png";
import fog from "./img/fog.png";
import drizzle from "./img/drizzle.png";
import sun from "./img/sun.png";
import unknown from "./img/unknown.png";
import ice from "./img/ice.png";
import thunderstorm from "./img/thunderstorm.png";
import question from "./img/question.png";

import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState({
    name: "",
  });
  const [cityName, setCityName] = useState("Check your city!");
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  let [warning, setWarning] = useState("");
  let [photo, setPhoto] = useState(question);

  const settingValue = (e) => {
    setValue({ name: e.target.value });
  };

  const changeWeather = async () => {
    const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
    const apiKey = "&appid=b1e0bd66f397b89c56904f6256c0a69a";
    const units = "&units=metric";
    let url;

    try {
      url = apiLink + value.name + apiKey + units;
      const fetchData = await fetch(url);
      const res = await fetchData.json();

      const temp = res.main.temp;
      const hum = res.main.humidity;
      const status = Object.assign({}, ...res.weather);

      setCityName(res.name);
      setWeather(status.main);
      setTemperature(Math.floor(temp) + "°C");
      setHumidity(hum + "%");
      setWarning("");
      setValue({ name: "" });

      if (status.id >= 200 && status.id < 300) {
        setPhoto(thunderstorm);
      } else if (status.id >= 300 && status.id < 400) {
        setPhoto(drizzle);
      } else if (status.id >= 500 && status.id < 600) {
        setPhoto(rain);
      } else if (status.id >= 600 && status.id < 700) {
        setPhoto(ice);
      } else if (status.id >= 700 && status.id < 800) {
        setPhoto(fog);
      } else if (status.id === 800) {
        setPhoto(sun);
      } else if (status.id >= 800 && status.id < 900) {
        setPhoto(cloud);
      } else {
        setPhoto(unknown);
      }
    } catch (err) {
      setWarning("Wpisz poprawną nazwę miasta!");
    }
  };

  return (
    <div className="wrapper">
      <div className="top">
        <h1>weather app</h1>
        <div className="main-info">
          <div>
            <h3 className="city-name">{cityName}</h3>
            <input
              onChange={settingValue}
              value={value.name}
              type="text"
              placeholder="Wpisz nazwę miasta..."
            />
            <button onClick={changeWeather}>Wyślij</button>
            <p className="warning">{warning}</p>
          </div>
          <img
            src={photo}
            alt="Obrazek przedstawiający pogodę"
            className="photo"
          ></img>
        </div>
      </div>
      <div className="bottom">
        <div className="headings">
          <p>Weather:</p>
          <p>Temperature:</p>
          <p>Humidity:</p>
        </div>
        <div className="weather-info">
          <p className="weather">{weather}</p>
          <p className="temp">{temperature}</p>
          <p className="humidity">{humidity}</p>
        </div>
      </div>
    </div>
  );
}
export default App;
