import { useEffect, useState } from 'react'
import axios from 'axios'
import { Diary } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    axios
      .get<Diary[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaries(response.data)
      })
  },[])

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try{
    const newEntry = await axios
      .post<Diary>("http://localhost:3000/api/diaries", {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      })
      setDiaries(diaries.concat(newEntry.data))
    }
    catch(error){
      if(axios.isAxiosError(error)){
        setErrors(error.response?.data)
        setTimeout(() => {
          setErrors(null)
        }, 5000)
      }
      else{
        console.error(error)
      }
    }
  };

  return (
  <div>
    <h1>Add New Entry</h1>
    {errors ?
    <div style={{'color' : 'red'}}>{errors}</div> : <></>}
    <div>
    <form onSubmit={addDiary}>
      <label>Date: </label>
      <input type='date' value={date} onChange={({target}) => setDate(target.value)}/><br/>

      <p>Visibility: </p>
        <input type='radio' id='great' value='great' onChange={({target}) => setVisibility(target.value)}></input>
        <label htmlFor='great'>Great</label>

        <input type='radio' id='good' value='good' onChange={({target}) => setVisibility(target.value)}></input>
        <label htmlFor='good'>Good</label>
        
        <input type='radio' id='ok' value='ok' onChange={({target}) => setVisibility(target.value)}></input>
        <label htmlFor='ok'>Ok</label>
        
        <input type='radio' id='poor' value='poor' onChange={({target}) => setVisibility(target.value)}></input>
        <label htmlFor='poor'>Poor</label>

      <p>Weather: </p>
        <input type='radio' id='sunny' value='sunny' onChange={({target}) => setWeather(target.value)}></input>
        <label htmlFor='sunny'>Sunny</label>

        <input type='radio' id='rainy' value='rainy' onChange={({target}) => setWeather(target.value)}></input>
        <label htmlFor='rainy'>Rainy</label>

        <input type='radio' id='cloudy' value='cloudy' onChange={({target}) => setWeather(target.value)}></input>
        <label htmlFor='cloudy'>Cloudy</label>

        <input type='radio' id='stormy' value='stormy' onChange={({target}) => setWeather(target.value)}></input>
        <label htmlFor='stormy'>Stormy</label>

        <input type='radio' id='windy' value='windy' onChange={({target}) => setWeather(target.value)}></input>
        <label htmlFor='windy'>Windy</label>

      <p>Comment: </p>
      <input value={comment} onChange={({target}) => setComment(target.value)}/><br/>
      <button type='submit'>Add</button>
    </form>
    </div>

    <h1>Diary Entries</h1>
    {diaries.map(d => (
      <p key={d.id}><strong>{d.date}</strong><br/>
        Visibility: {d.visibility}<br/>
      Weather: {d.weather}
      </p>
    ))}
  </div>
  )
}

export default App;