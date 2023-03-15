const Course = (props) => {
  return(
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
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
          <ul key={p.id}>
            {p.name}&nbsp;&nbsp;
            {p.exercises}
          </ul>)}
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