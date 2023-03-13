import { useState } from 'react'

const Button = (props) => {
  return(
      <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  const average = ((props.good*1) + (props.neutral*0) + (props.bad*(-1))) / props.total.length
  const positivePercentage = ((props.good) / props.total.length) * 100
  return(
    <div>
      <p>Good &nbsp; {props.good}</p>
      <p>Neutral &nbsp; {props.neutral}</p>
      <p>Bad &nbsp; {props.bad}</p>
      <p>Total &nbsp; {props.good + props.neutral + props.bad}</p>
      <p>Average &nbsp; {average}</p>
      <p>Positive &nbsp; {positivePercentage}%</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState([])

  const increaseGood = () => {
    setGood(good + 1)
    setTotal(total.concat('G'))
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total.concat('N'))
  }

  const increaseBad = () => {
    setBad(bad + 1)
    setTotal(total.concat('B'))
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text='Good'/>&nbsp;
      <Button handleClick={increaseNeutral} text='Neutral'/>&nbsp;
      <Button handleClick={increaseBad} text='Bad'/>
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
