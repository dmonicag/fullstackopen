import axios from "axios";

const baseUrl = '/api/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => {return response.data})
}

const deletePerson = (id, delPerson) => {
    const request = axios.delete(`${baseUrl}/${id}`, delPerson)
    return request.then(response => {return response.data})
}

const updatePerson = (id, updatePerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatePerson)
    return request.then(response => {return response.data})
}

export default { getPersons, createPerson, deletePerson, updatePerson };