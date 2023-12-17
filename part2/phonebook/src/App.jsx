import React, { useState } from 'react'




const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.every(element => element.name != newName)) {
      const personObject = { name: newName};
      setPersons(persons.concat(personObject));
    } else {
        alert(`${newName} is already added to phonebook`)
    }
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(element => {
        return <p key={element.name}>{element.name}</p>
      })}
    </div>
  )
}

export default App
