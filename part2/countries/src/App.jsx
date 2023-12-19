import { useState, useEffect } from 'react'

import countryService from './services/countries'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [countries , setCountries] = useState([])
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState([])
  const [show, setShow] = useState(false)
  const [current, setCurrent] = useState([])

useEffect(() => {
  countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
      setSearch(initialCountries)
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
      return(
        <ShowCountries search={search} filter={filter} current={current} handleSearch={handleSearch} show={show} handleShow={handleShow} />
      )
}

export default App
