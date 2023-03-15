const Course = (props) => {
  return(
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total parts={props.course.parts} />
    </div>
  )
}
const Header = (props) => {
  return(
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}
const Part = (props) => {
  return(
    <div>
        {props.part.map(p => 
          <p key={p.id}>
            {p.name}&nbsp;&nbsp;
            {p.exercises}
          </p>)}
    </div>
  )
}
const Content = (props) => {
  return(
    <div>
      <Part part={props.course.parts}/>
    </div>
  )
}
const Total = (props) => {
  const exercises= props.parts.map(total => total.exercises)
  const total = exercises.reduce((a, b) => a + b, 0)
  return (
    <div>
      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }
  return <Course course={course} />
}

export default App