import axios from 'axios'
import { useState, useEffect } from 'react'

//Languages component
const Languages = ({languages}) => {
  let lang = []
  for(let language in languages) {
    lang.push(<li key={language}>{languages[language]}</li>)
  }
  return lang;
}

//Filter component
const Filter = (props) => {
  const regex = new RegExp(props.value, "i")
  const result = props.countries.filter(element => regex.test(element.name.common))
  
  if(result.length > 10) {
    return <p>Too many matches, specify another filter</p>

  } else if(result.length > 1) {
    return (
      result.map(element => <p key={element.name.common}>{element.name.common}</p>)
    )
  } else if (result.length == 1){
      return (
        <div>
          <h1>{result[0].name.common}</h1>
          <p>capital: {result[0].capital}</p>
          <p>population: {result[0].population}</p>
          <h2>languages</h2>
          <ul>
            <Languages languages={result[0].languages} />
          </ul>
          <img src={result[0].flags.svg} alt="flag" width="200" />
        </div>
      )

  } else {
    return (
        <p>No matches</p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
 
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <div>
          find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <Filter value={search} countries={countries} /> 
    </>
  )
}

export default App
