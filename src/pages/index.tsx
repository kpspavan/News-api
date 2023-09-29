import InputComponent from "../component/InputComponent";
import React, { useState, useEffect } from "react";
import inputstyles from "../styles/Home.module.css";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  };
}

interface LocationHistoryItem {
  name: string;
  data: WeatherData;
}

const Index: React.FC = () => {
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  console.log("weatherData", weatherData);
  const [locationHistory, setLocationHistory] = useState<LocationHistoryItem[]>(
    []
  );

  console.log("locationHistory", locationHistory);
  const fetchWeatherData = async () => {
    try {
      const apiKey = "72f425e183edb83c4c6834839e1014b7";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      const data: WeatherData = await response.json();
      setWeatherData(data);
      const newLocation: LocationHistoryItem = { name: cityName, data };
      setLocationHistory([...locationHistory, newLocation]);
      localStorage.setItem(
        "localhistory",
        JSON.stringify([...locationHistory, newLocation])
      );
    } catch (err) {
      console.log("Error Fetching Weather Data", err);
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("localhistory");
    if (storedHistory) {
      setLocationHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    const existinglocationindex = locationHistory.findIndex((item) => item.name === cityName )
    if(existinglocationindex !==-1 ){
      const existingLocation=locationHistory[existinglocationindex]
      setWeatherData(existingLocation.data);

    }
     else {
      fetchWeatherData();
    }
  };

  return (
    <div>
      <p>Weather App</p>
      <InputComponent
        type="text"
        placeholder="Enter a country name"
        onChange={handelInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {weatherData && (
          <div className={inputstyles.defaultdiv}>
            <div>
              <h2>Country: {weatherData?.sys?.country}</h2>
              <h2>City: {weatherData?.name}</h2>
              <h2>Temp: {weatherData?.main?.temp}</h2>
              <h2>min Temp: {weatherData?.main?.temp_min}</h2>
              <h2>max Temp: {weatherData?.main?.temp_max}</h2>
              <h2>wind speed: {weatherData?.wind?.speed}</h2>
              <h2>Humidity: {weatherData?.main?.humidity}</h2>
            </div>
            <div>
              <h1> Tommorow Forecast</h1>
              <p>
                {" "}
                <h2>min Temp: {weatherData?.main?.temp_min}</h2>
              </p>
              <p>
                <h2>max Temp: {weatherData?.main?.temp_max}</h2>
              </p>
            </div>
            <div></div>
          </div>
        )}
        <div>Recent Searches</div>
        {locationHistory.map((data) => {
          console.log("data is here from local storage", data);
          return <div key={data.name}>{data.name}</div>;
        })}
      </div>
    </div>
  );
};

export default Index;
