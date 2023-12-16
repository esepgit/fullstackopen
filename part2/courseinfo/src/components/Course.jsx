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

  export default Course