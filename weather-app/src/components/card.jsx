import Classes from "../styles/Card.module.css";

import sunMild from "../assets/Sunshine.svg";
import sunStrong from "../assets/Sun.svg";
import rain from "../assets/Rainy.svg";
import storm from "../assets/Rainy-thunder.svg";
import snow from "../assets/Snow.svg";
import overCast from "../assets/Cloud-wind.svg"
import moon from "../assets/Moon.svg";
import night from "../assets/Night.svg"
import nightRain from "../assets/Night-rainy.svg";
import preview from "../assets/Preview.svg"

const card = ({city, weather}) => {
    const current = new Date();
    const date = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate(), current.getDay(), 0, 0));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const hour = current.getHours();

    const getImage = () => {
        if(city && weather){
            const code = weather.hourly.weathercode[hour];

            if (code >= 66 && code <= 77){
                return snow;
            } else if (code === 85 || code === 86){
                return snow;
            } else if (code > 95){
                return storm;
            } else {
                if(weather.hourly.is_day[hour] === 0){
                    if(code === 0 || code === 1){
                        return moon;
                    } else if (code > 50){
                        return nightRain;
                    } else {
                        return night;
                    }
                } else {
                    if(code === 0){
                        return sunStrong;
                    } else if (code === 1 || code === 2){
                        return sunMild;
                    } else if (code >= 3 && code <= 48){
                        return overCast;
                    } else if (code >= 51 && code <= 65){
                        return rain;
                    }  else if (code >= 80 && code <= 82){
                        return rain;
                    } 
                }
            }
        } else {
            return preview;
        }
    }

    return (
        <div className={Classes.Container}>
            <div className={Classes.ImageContainer}>
               <img src={getImage()} alt="weather"/>
            </div>
            <div className={Classes.Text}>
                <h1 className={Classes.Weather}>{weather ? `${weather.hourly.temperature_2m[hour]} °C` : "" }</h1>
                <h3 className={Classes.Description}>{weather ? ` Feels like ${weather.hourly.apparent_temperature[hour]}°C`: ""}</h3>
                <h4 className = {Classes.Description}>{weather ? `${weather.daily.temperature_2m_max}°C Max - ${weather.daily.temperature_2m_min}°C Min`: ""}</h4>
                <h4 className={Classes.Description}>{weather ? `${weather.hourly.precipitation_probability[hour]}% Chance of Precipitation`: ""}</h4>
                <h4 className={Classes.Description}>{city} - {date.toLocaleDateString("en-US", options)} - {`${current.getHours()}:${current.getMinutes(    )}`}</h4>
            </div>
        </div>
    )
}

export default card;