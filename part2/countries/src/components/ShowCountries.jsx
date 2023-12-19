import Show from './Show'
import Languages from "./Languages"

const ShowCountries = ({search, filter, current, handleSearch, show, handleShow}) => {

    if(search.length > 10) {
        return (
          <>
            <p>Find Countries <input value={filter} onChange={handleSearch} /></p>
            <p>Too many matches, specify another filter</p>
          </>
        )

      } else if(search.length > 1) {
          if(show) {
            return (
              <>
                <p>Find Countries <input value={filter} onChange={handleSearch} /></p>
                <Show current={current} />
              </>
            )
          } else {
            return (
              <>
                <p>Find Countries <input value={filter} onChange={handleSearch} /></p>
                {search.map(element => (
                    <p key={element.cca2}>{element.name.common}<button onClick={() => handleShow(element.cca2)}>show</button></p>
                ))}
              </>
            )
          } 
        
      } else if(search.length == 1) {
        return (
          <>
          <p>Find Countries <input value={filter} onChange={handleSearch} /></p>
          {search.map(element => (
            <div key={element.cca2}>
              <h1>{element.name.common}</h1>
              <p>capital: {element.capital}</p>
              <p>population: {element.population}</p>
              <h2>languages</h2>
              <ul>
                <Languages languages={element.languages} />
              </ul>
              <img src={element.flags.svg} alt="flag" width="200" />
            </div>
          ))}
          </>
        )
      } else {
            return (
                <>
                    <p>Find Countries <input value={filter} onChange={handleSearch} /></p>
                    <p>No matches</p>
                </>
            )
        
      }

}

export default ShowCountries