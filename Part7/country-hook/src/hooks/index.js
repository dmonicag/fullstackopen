import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const getCountry = (name) => {
  const request = axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
  return request.then(response => response.data[0])
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState({data: [], found: false})  
    const firstRender = useRef(true)
  
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false
        return
      }
      getCountry(name)
        .then(country => {
          setCountry({data: country, found: true})
        })
        .catch(error => {
          console.log(error.message)
          setCountry(country => ({...country, found: false}))        
        })
    }, [name])

    return country
}
  