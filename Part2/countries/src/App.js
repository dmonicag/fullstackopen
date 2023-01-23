import logo from './logo.svg';
import './App.css';
import countriesService from './services/countries';
import CountryForm from './components/CountryForm';
import { useEffect, useState } from 'react';


const App = () => {

  const [countries, setCountries] = useState([])
  const [results, setResults] = useState({query:'', countries_list: []})

  useEffect(() => {
    console.log("get countries")
    countriesService
      .getAll()
      .then(originalState => {
        setCountries(originalState)
        console.log("promise fulfilled")
      })
  }, [])

  const handleSearch = (event) => {
    const country_name = event.target.value

    const filtered_countries = countries.filter((result) => {
      if(country_name !== ''){
        return result.name.common.toLowerCase().startsWith(country_name.toLowerCase())
      }
      else{
        setCountries(countries)
      }
    })
    setResults({query: country_name, countries_list: filtered_countries})
    console.log(results)
  }

  const show_info = (event) => {
    const info = countries.filter((i) => {
      return i.ccn3 === event.target.value
    })
    setResults({countries_list: info})
  }


  return (
    <div>
      <CountryForm results={results} handleSearch={handleSearch} show_info={show_info}/>
    </div>
  )

}

export default App;
