
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
    <p>{props.name1} {props.exercises1}</p>
    <p>{props.name2} {props.exercises2}</p>
    <p>{props.name3} {props.exercises3}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
  )
}

const App = () => {
  const course = "Half stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content
      name1={part1} exercises1={exercises1}
      name2={part2} exercises2={exercises2}
      name3={part3} exercises3={exercises3}
      />
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </div>
  )
}

export default App;
