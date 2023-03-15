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
  export default Course