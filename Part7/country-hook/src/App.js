import React, { useState } from 'react'
import { useField, useCountry } from './hooks'

const Country = ({ country }) => {
  if (!country.data) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const country_info = country.data
  return (
    <div>
      <h3>{country_info.name.common} </h3>
      <div>capital {country_info.capital} </div>
      <div>population {country_info.population}</div> 
      <img src={country_info.flags.png} height='100' alt={`flag of ${country_info.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App