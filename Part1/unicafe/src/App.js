import './App.css';
import { useState } from 'react'

const Button = (props) => {
  return(
      <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Display = (props) => {  
  return(
    <div>
      <h2>Statistics</h2>      
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad} total={props.total}/>
    </div>
  )
}
const StatisticLine = (props) => {
  return(
    <div>
      <table><tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
      </tbody></table>
    </div>
  )
}
const Statistics = (props) => {
  const average = ((props.good*1) + (props.neutral*0) + (props.bad*(-1))) / props.total.length
  const positivePercentage = ((props.good) / props.total.length) * 100
  const totalfeedback = props.good + props.neutral + props.bad
  if(props.total.length === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>      
      <StatisticLine text='Good' value={props.good} />
      <StatisticLine text='Neutral' value={props.neutral} />
      <StatisticLine text='Bad' value={props.bad} />
      <StatisticLine text='Total' value={totalfeedback} />
      <StatisticLine text='Average' value={average.toFixed(2)} />
      <StatisticLine text='Positive' value={`${positivePercentage.toFixed(2)}%`} />
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
      <Display good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
