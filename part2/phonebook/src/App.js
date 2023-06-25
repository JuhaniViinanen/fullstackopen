import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

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
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }

  const personsFiltered = persons.filter( person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter phonebook: <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsFiltered.map( person =>
          <li key={person.name}>{person.name} {person.number} </li>
        )}
      </ul>
    </div>
  )
}

export default App
