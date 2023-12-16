//Header component
const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

//Content component
const Content = ({course}) => {
  return (
    <>
      {course.parts.map(element => <Part key={element.id} part={element.name} exercises={element.exercises} />)}
    </>
  )
}

//Part component
const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

//Course component
const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content course={props.course} />
    </>
  )
}

//App component
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App
