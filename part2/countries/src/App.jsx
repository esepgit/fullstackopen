import axios from 'axios'
import { useState, useEffect } from 'react'

//Languages component
const Languages = (props) => {
  let result = []
    for(let lan in props.languages) {
        result.push(<li key={lan}>{props.languages[lan]}</li>)
    }
    return result
}

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

const App = () => {
  const [countries , setCountries] = useState([])
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState([])
  const [show, setShow] = useState(false)
  const [current, setCurrent] = useState([])

useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
      setSearch(response.data)
    })
    .catch(error => {
      console.log(error);
    }) 
}, [])

const handleSearch = (event) => {
  setFilter(event.target.value)
  const regex = new RegExp(event.target.value, "i")
  setSearch(countries.filter(element => regex.test(element.name.common)))
  setShow(false)
}

const handleShow = (id) => {
  setCurrent(search.find(element => element.cca2 == id))
  setShow(!show)
}
      
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
        <>
          <p>Find Countries <input value={filter} onChange={handleSearch} /></p>
          <p>No matches</p>
        </>
      }
}

export default App
