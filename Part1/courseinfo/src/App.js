const Header = (props) => {
  return(
    <div>
      <h1>
      {props.course}
      </h1>
    </div>
  )
}
const Part = (props) => {
  return(
    <div>
      {props.part} &nbsp; {props.exercise}
    </div>
  )
}
const Content = (props) => {
  return(
    <div>
      <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} />
    </div>
  )
}
const Total = (props) => {
  return(
    <div>
      <p>Number of excercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part = {
    part1 : 'Fundamentals of React',
    part2 : 'Using props to pass data',
    part3 : 'State of a component'
  }
  const exercise = {
    exercises1 : 10,
    exercises2 : 7,
    exercises3 : 14
  }
  return (
    <div>
      <Header course={course} />
      <Content {...part} {...exercise}/>
      <Total {...exercise} />
    </div>
  )
}

export default App;
