import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from "./components/Filter"
import Personform from './components/Personform'
import Personslist from "./components/Personslist"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
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

      axios
        .post("http://localhost:3001/persons", newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
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
