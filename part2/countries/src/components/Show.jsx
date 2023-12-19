import Languages from "./Languages"

//Show component
const Show = (props) => {
    return (
      <>
          <div key={props.current.cca2}>
            <h1>{props.current.name.common}</h1>
            <p>capital: {props.current.capital}</p>
            <p>population: {props.current.population}</p>
            <h2>languages</h2>
            <ul>
              <Languages languages={props.current.languages} />
            </ul>
            <img src={props.current.flags.svg} alt="flag" width="200" />
          </div>
      </>
    )
  }

  export default Show