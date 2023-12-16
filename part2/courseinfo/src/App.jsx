//Header component
const Header = (props) => {
  return (
    <>
      <h2>{props.courses.name}</h2>
    </>
  )
}

//Content component
const Content = ({courses}) => {
  return (
    <>
      {courses.parts.map(element => <Part key={element.id} part={element.name} exercises={element.exercises} />)}
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

//Total component
const Total = ({courses}) => {
  const total = courses.parts.reduce((acc, cur) => {
    return acc + cur.exercises;
  },0)

  return (
    <h3>total of {total} exercises</h3>
  )
}

//Course component
const Course = (props) => {
  return (
    <>
      {props.courses.map(element => {
        return (
        <div key={element.id}>
          <Header courses={element} />
          <Content courses={element} />
          <Total courses={element} />
        </div>
        )
      })}
    </>
  )
}

//App component
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </> 
    ) 
}

export default App
