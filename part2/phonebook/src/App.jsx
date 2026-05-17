


import { useState, useEffect } from "react"
import personService from "./services/persons"


const Notification = ({ message, type }) => {
  if (message == null) {
    return null}

  const notificationStyle= {
    color: type == "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 18,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15}

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Filter = ({ filter,filterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={filterChange} />
  </div>
)

const PersonForm = ({ addPerson, newName, nameChange, newNumber, numberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={nameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={numberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ personShown, deletePerson }) => (
  <div>
    {personShown.map(person => 
      <div key={person.name}>
        {person.name} {person.number} {" "}
        <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
      </div>
    )}
  </div>
)


const App = () => {
  const [persons, setPersons] =useState([])
  const [newName, setNewName] =useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState("success")


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson =(event) => {
    event.preventDefault()
    
    
    const duplictae = persons.find(person => person.name ==newName)

    if (duplictae) {
      if (window.confirm(`${newName} is already added to phonebook! replace?`))
        {const changedPerson = { ...duplictae,number: newNumber }

        personService
          .update(duplictae.id, changedPerson)
          .then(returnedPerson => {
          
            setPersons(persons.map(person => person.id !== duplictae.id ? person : returnedPerson))
            setNewName("")
            setNewNumber("")
            setMessage(`Updated ${returnedPerson.name}'s number`)
            setNotificationType("success")
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })

          .catch(error => {
            setMessage(`Information of ${duplictae.name} has already been removed from server`)
            setNotificationType("error")
            setTimeout(() =>{
              setMessage(null)
            }, 4000)
            setPersons(persons.filter(p => p.id != duplictae.id))
          })
      }
      return
    }

    const newentry ={
      name: newName,
      number: newNumber
    }


    personService
      .create(newentry)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage(`Added ${returnedPerson.name}`)
        setNotificationType("success")
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error=>{
        setMessage(`${error.response.data.error}`)
        setNotificationType("error")
        setTimeout(()=>{
          setMessage(null)
        },4000)
      })
  }

  const deletePerson =(id,name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id != id))
        })
    }
  }

  const nameChange= (event) => setNewName(event.target.value)
  const numberChange= (event) => setNewNumber(event.target.value)
  const filterChange= (event) => setFilter(event.target.value)

  const personShown = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  
    return (
    <div>
      <h2>Phonebook</h2>
      <Notification message= {message} type= {notificationType} />
      <Filter filter= {filter} filterChange= {filterChange} />
      
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        nameChange={nameChange} 
        newNumber={newNumber} 
        numberChange={numberChange} 
      />
      
      <h3>Numbers</h3>
      <Persons 
        personShown= {personShown} 
        deletePerson= {deletePerson} 
      />
    </div>
  )
}

export default App