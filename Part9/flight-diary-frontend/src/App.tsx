import { useEffect, useState } from 'react'
import axios from 'axios'
import { Diary } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    axios
      .get<Diary[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaries(response.data)
      })
  },[])

  return (
  <div>
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
