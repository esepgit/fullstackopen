import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

//Filter component
const Filter = (props) => {
  return (
    <div>
        filter shown with <input value={props.value} onChange={props.onchange} />
    </div>
  ) 
}

//PersonForm component
const PersonForm = (props) => {
  return (
    <form onSubmit={props.onsubmit}>
      <div>
        name: <input value={props.valuename} onChange={props.onchangename} />
      </div>
      <div>
        number: <input value={props.valuenumber} onChange={props.onchangenumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

//Persons component
const Persons = (props) => props.filter.map(element => {
  return (<p key={element.name}>{element.name} {element.number} <button onClick={() => props.handleDeletePerson(element.id, element.name)}>delete</button></p>)
})

//App component
const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ filter, setFilter ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter] = useState('');

  //Call to DB. axios + Effect Hook
  useEffect(() => {
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
        /*filter es inicializado con los mismos valores de persons 
        para que inicialmente se muestren todos los nombres */
        setFilter(initialData)
      })
      .catch(error => console.log(error))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => {
    const regex = new RegExp(event.target.value, "i")
    setFilter(persons.filter(element => regex.test(element.name)))
    setNewFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.every(element => element.name != newName)) {
      const personObject = { name: newName, number: newNumber };

      personsService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          //agrego el nuevo valor a filter para que se muestre en pantalla el nuevo nombre
          setFilter(persons.concat(newPerson))
        })
        .catch(error => console.log(error))
      
    } else {
      //Update number
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(element => element.name === newName)
          const id = person.id
          const newObject = {...person, number: newNumber}
          personsService
            .updateNumber(id, newObject)
            .then(updated => {
              setPersons(persons.map(element => element.id !== id ? element : updated))
              setFilter(filter.map(element => element.id !== id ? element : updated))
            })
            .catch(error => console.log(error))
        }
    }
    setNewName('');
    setNewNumber('');
  }

  //Delete person
  const handleDeletePerson = (id, name) => {

    if(window.confirm(`Delete ${name} ?`)) {
      personsService
      .deletePerson(id)
      .then(response => {
        console.log(response);
      setPersons(persons.filter(element => element.id !== id ))
      setFilter(persons.filter(element => element.id !== id))  
      })
      .catch(error => console.log(error))
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onchange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onsubmit={addPerson} valuename={newName} onchangename={handleNameChange} valuenumber={newNumber} onchangenumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
