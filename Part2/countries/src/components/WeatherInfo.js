import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const WeatherInfo = ({capital_city}) => {
    
    const [weather, setWeather] = useState(null)
    const capital = capital_city[0]

    useEffect(() => {
        console.log("get weather")
        weatherService
        .getWeather(capital)
        .then(weather => {
            setWeather(weather)
            console.log("weather acquired")          
        })
    }, [capital])
    
    if(weather){
        const weatherIcon = weather.weather[0].icon
        weatherService
        .getIcon(weatherIcon)
        .then(i => {                   
            var imageUrl = URL.createObjectURL(i);
            document.querySelector("#image").src = imageUrl;
        })
    }
    
    if(!weather){ return null }

    return (
        <div>     
            <p><b>Temperature:</b> {(weather.main.temp - 273.15).toFixed(2)} c</p>
            <p>
                <table><tbody><tr>
                    <td><b>{weather.weather[0].description}</b></td>
                    <td><img id="image"/></td>
                </tr></tbody></table>
            </p>
            <p><b>Wind: </b>{weather.wind.speed}m/s</p>             
        </div>
    )
}

export default WeatherInfo;
