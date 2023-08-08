import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterStr, handleFilterChange}) => (
  <div>
    filter shown with: <input value={filterStr} onChange={handleFilterChange}/>
  </div>
)

const PersonForm = ({ newName, newNumber, addNewPerson, handleNameChange, handleNumberChange }) => (
  <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, filterStr }) => (
  <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(filterStr.toLocaleLowerCase()))
      .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterStr(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name == newName) === undefined) {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterStr={filterStr} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filterStr={filterStr}/>
    </div>
  )
}

export default App