import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  /*filter es inicializado con los mismos valores de persons 
  para que inicialmente se muestren todos los nombres */
  const [ filter, setFilter ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter] = useState('');

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
      setPersons(persons.concat(personObject));
      //agrego el nuevo valor a filter para que se muestre en pantalla el nuevo nombre
      setFilter(persons.concat(personObject))
    } else {
        alert(`${newName} is already added to phonebook`)
    }
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter.map(element => {
        return <p key={element.name}>{element.name} {element.number}</p>
      })}
    </div>
  )
}

export default App
