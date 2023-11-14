import { useEffect, useState } from 'react'
import axios from 'axios'
import { Diary } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios
      .get<Diary[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaries(response.data)
      })
  },[])

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios
      .post<Diary>("http://localhost:3000/api/diaries", {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      })
      .then(response => {
        setDiaries(diaries.concat(response.data))
      })

  };

  return (
  <div>
    <h1>Add New Entry</h1>
    <form onSubmit={addDiary}>
      <label>date: </label>
      <input value={date} onChange={({target}) => setDate(target.value)}/><br/>
      <label>visibility: </label>
      <input value={visibility} onChange={({target}) => setVisibility(target.value)}/><br/>
      <label>weather: </label>
      <input value={weather} onChange={({target}) => setWeather(target.value)}/><br/>
      <label>comment: </label>
      <input value={comment} onChange={({target}) => setComment(target.value)}/><br/>
      <button type='submit'>Add</button>
    </form>
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

export default App
