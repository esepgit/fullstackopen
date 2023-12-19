//Languages component
const Languages = (props) => {
    let result = []
      for(let lan in props.languages) {
          result.push(<li key={lan}>{props.languages[lan]}</li>)
      }
      return result
  }

export default Languages