const CountryInfo = ({country_info}) => {
    return (
        <div>
            <h2>{country_info.name.common}</h2>
            <p> <b>Capital: </b> {country_info.capital} </p>
            <p> <b>Area: </b> {country_info.area} Sq Km</p>
            <p> <b>Flag: </b> {country_info.flag} </p>
            <p> <b>Languages: </b> 
                    {Object.entries(country_info.languages).map(([keys, value]) =>
                    <div key={country_info.ccn3}>{value}</div>)}
            </p>
        </div>
    )
}

export default CountryInfo;