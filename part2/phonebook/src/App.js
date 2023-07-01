import { useState, useEffect } from 'react'

import Filter from "./components/Filter"
import Personform from './components/Personform'
import Personslist from "./components/Personslist"

import phoneBook from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    phoneBook
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleInputChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...person, number: newNumber}
        phoneBook
          .change(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          })
      }
    } else {
      const newPerson = { 
        name: newName, 
        number: newNumber
      }

      phoneBook
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phoneBook
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const personsFiltered = persons.filter( person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        text={"Filter phonebook:"} 
        value={filter} 
        eventHandler={handleFilterChange} 
      />
      <h3>Add a new person</h3>
      <Personform 
        submitHandler={handleFormSubmit} 
        nameValue={newName}
        nameChangeHandler={handleInputChange}
        numberValue={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Personslist persons={personsFiltered} handleDelete={handleDelete} />
    </div>
  )
}

export default App
