import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({country_info}) => {
    
    return (
        <div>
            <div>
                <h2>{country_info.name.common}</h2>
                <p> <b>Capital: </b> {country_info.capital} </p>
                <p> <b>Area: </b> {country_info.area} Sq Km</p>
                <p> <b>Languages: </b> 
                    {Object.entries(country_info.languages).map(([keys, value]) =>
                    <div key={country_info.ccn3}>{value}</div>)}
                </p>
                <p>
                <img src={country_info.flags.png}></img>
                </p>
                <p> <h2>Weather in {country_info.capital}</h2></p>
            </div>
           <WeatherInfo capital_city={country_info.capital}/>
        </div>
    )
}

export default CountryInfo;
