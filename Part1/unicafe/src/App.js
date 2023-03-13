import { useState } from 'react'

const Button = (props) => {
  return(
      <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return(
    <div>
      <p>Good &nbsp; {props.good}</p>
      <p>Neutral &nbsp; {props.neutral}</p>
      <p>Bad &nbsp; {props.bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text='Good'/>&nbsp;
      <Button handleClick={increaseNeutral} text='Neutral'/>&nbsp;
      <Button handleClick={increaseBad} text='Bad'/>
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
