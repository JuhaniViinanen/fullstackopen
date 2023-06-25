
const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </ul>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course
