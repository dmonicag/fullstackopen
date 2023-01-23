import './App.css';

import AddPersonForm from './components/AddPersonForm';
import SearchForm from './components/SearchForm';
import { useState, useEffect } from 'react';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([])
  const [persons_copy, setCopy] = useState({query : '', list : []})
  const [newPerson, setNewPerson] = useState('')

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
      alert(`Contact updated successfully`)
  }


  const add_contact = (event) => {
    event. preventDefault()
    const new_Name = event.target.name.value
    const new_Number = event.target.number.value
    const new_Person = {name: new_Name, number: new_Number}
  
    if (persons.map(p => p.name).includes(new_Name) ){
     if(window.confirm(`${new_Name} already in Phonebook. Replace old number with new one?`)){
        update_contact(new_Name, new_Number)
        setNewPerson({name:'', number:''})      
     }
    }
    else if (persons.map(p=> p.number).includes(new_Number)){
      alert(`${new_Number} already in Phonebook`)
      setNewPerson({name:'', number:''})
    }
    else{
      personService
      .createPerson(new_Person)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
      })
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
          alert(`Contact ${del_contact.name} deleted`)
          setPersons(copy)
        })
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <AddPersonForm add_contact={add_contact}/>
      <SearchForm persons ={persons} persons_copy={persons_copy} handleSearch={handleSearch} delete_person={delete_person}/>    
    </div>
  )
}

export default App;
