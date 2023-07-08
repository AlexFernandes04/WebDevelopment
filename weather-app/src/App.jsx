import Card from "./components/card.jsx";
import Footer from "./components/footer";
import Header from "./components/header";
import SearchBar from "./components/searchBar";

import {React, useState, useEffect} from "react";

import './App.css';
import axios from "axios";

function App() {
  const [city, setCity] = useState(getInitialCity());
  const [weather, setWeather] = useState(null);
  
  const getWeather = async () => {
    try{
      const locationData = await axios.get(`https://geocode.maps.co/search?city=${city}`);
      const weatherData = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${locationData.data[0].lat}&longitude=${locationData.data[0].lon}&hourly=is_day,temperature_2m,apparent_temperature,precipitation_probability,weathercode&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FNew_York&forecast_days=1`);
      // console.log(locationData.data[0].lat);
      // console.log(locationData.data[0].lon);
      setWeather(weatherData.data);
    } catch (e) {
      // alert("Could not find your city");
      console.log(e);
    }
  }

  useEffect(() => {
    if(city){
      console.log("Getting initial weather");
      getWeather();
    }

    return () => {
      console.log('App closed');
    };
  }, []);

  useEffect(() => {
    const temp = city;
    localStorage.setItem("city", temp);
  }, [city]);

  function getInitialCity() {
    console.log("TEST city");
    const temp = localStorage.getItem("city");
    return temp || "";
  }

  const handleChange = (e) => {
      setCity(e.target.value);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      getWeather();
  }

  const getLocation = async () => {
    console.log("LOCATION");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const {latitude, longitude} = position.coords;
      const locationData = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`);
      setCity(locationData.data.address.city || locationData.data.address.town);
      console.log("Latitude is :", latitude);
      console.log("Longitude is :", longitude);
      getWeather();
    });
  }

  return (
    <div className="Container">
      <Header />
      <SearchBar city = {city} handleChange={handleChange} handleSubmit={handleSubmit} getLocation={getLocation}/>
      <Card city={city} weather={weather}/>
      <Footer />
    </div>
  );
}

export default App;
