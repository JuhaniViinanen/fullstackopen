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
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { 
        name: newName, 
        number: newNumber
      }

      phoneBook
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
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
      <Personslist persons={personsFiltered} />
    </div>
  )
}

export default App
