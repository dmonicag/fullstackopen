const Course = (props) => {
  return(
    <div>
      <Content course={props.course} />
    </div>
  )
}
const Content = (props) => {
  return(
   <div>
    {props.course.map(c => 
      <div key={c.id}>
       <Header course={c}/>
        {
         c.parts.map(p =>
          <p key={p.id}>
           {p.name}&nbsp;&nbsp;{p.exercises}           
          </p>)
        }
        <Total parts={c.parts}/>
      </div>)}
   </div>
  )
}
const Header = (props) => {
  return(
    <div>
      <h2>
      {props.course.name}
      </h2>
    </div>
  )
}
const Total = (props) => {
  const exercises= props.parts.map(total => total.exercises)
  //using reduce
  const total = exercises.reduce((a, b) => a + b, 0)
  return (
    <div>
      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

const App = () => {
  const course = [
    {
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
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  },
  ]
  return (
   <div>
    <h1>Web development curriculum</h1>
    <Course course={course} />
   </div>
  )
}
export default App