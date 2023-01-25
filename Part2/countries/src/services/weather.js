import axios from "axios";

const url = 'https://api.openweathermap.org/data/2.5/weather'
const iconUrl = 'http://openweathermap.org/img/wn'
const API_key = process.env.REACT_APP_API_KEY

const getWeather = (capital) => {
    const request = axios.get(url,{
        params: {
            q: capital,
           appid: API_key
            }})
    return request.then(response => response.data)
}

const getIcon = (icon) => {
    const request = axios.get(`${iconUrl}/${icon}@2x.png`, {responseType: "blob"})
    return request.then(response => response.data)

}

export default {getWeather, getIcon};


