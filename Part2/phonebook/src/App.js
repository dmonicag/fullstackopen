import './App.css';

import AddPersonForm from './components/AddPersonForm';
import SearchForm from './components/SearchForm';
import { useState, useEffect } from 'react';
import personService from './services/person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [persons_copy, setCopy] = useState({query : '', list : []})
  const [notification, setNotification] = useState(null)
  const [error_notification, setError] = useState(null)

  useEffect(() => {
    personService
      .getPersons()
      .then(initialState => {
        setPersons(initialState)
      })
  }, [])
  

  const handleSearch = (event) => {
    const search_input = event.target.value
    const search_results = persons.filter((result) => {
      if(search_input !== ''){
        return result.name.toLowerCase().startsWith(search_input.toLowerCase())
      }
      else{
        setPersons(persons)
      }
    })
    setCopy({query : search_input, list: search_results})
  }


  const update_contact = (name, number) => {
    const person_to_update = persons.find(p=> p.name === name)
    const id = person_to_update.id
    const changedPerson = {...person_to_update, number: number}
    personService
      .updatePerson(id, changedPerson)
      .then(up_contact => {
        setPersons(persons.map(person => person.id !== id ? person : up_contact))
      })
      .catch(error => {
        setError(`Contact already removed from server`)
        setTimeout(()=> {
          setError(null)
        }, 5000)
      })
     
      setNotification(`Number for ${person_to_update.name} updated successfully`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }


  const add_contact = (event) => {
    event. preventDefault()
    const new_Name = event.target.name.value
    const new_Number = event.target.number.value
    const new_Person = {name: new_Name, number: new_Number}

  if(!new_Name && !new_Number){
    setError(`Cannot add contact. Please fill in the Name`)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }
  else{

    if (persons.map(p => p.name).includes(new_Name) ){
     if(window.confirm(`${new_Name} already in Phonebook. Replace old number with new one?`)){
        update_contact(new_Name, new_Number)
      }
    }
    else if (persons.map(p=> p.number).includes(new_Number)){
    
      setError(`${new_Number} is already in Phonebook`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    else{
      personService
      .createPerson(new_Person)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNotification(`Contact ${new_Person.name} added successfully`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
    event.target.reset()
  }
  }

  const delete_person = (id) => {
    const del_contact = persons.find(p => p.id === id)
    const index = persons.indexOf(del_contact)
    const copy= [...persons]
    if(window.confirm("Delete Contact?"))
    {   
      personService
      .deletePerson(id, del_contact)
      .then(()=>{
          copy.splice(index, 1)
         setNotification(`Contact ${del_contact.name} deleted successfully`)
         setTimeout(() => {
          setNotification(null)
         }, 5000)
          setPersons(copy)
        })
      .catch(error => {
        setError(`Contact already deleted`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} error_message={error_notification}/>
      <AddPersonForm add_contact={add_contact}/>
      <SearchForm persons ={persons} persons_copy={persons_copy} handleSearch={handleSearch} delete_person={delete_person}/>    
    </div>
  )
}

export default App;
