import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
    setErrorMessage("You are logged out")
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? 
        (<>
          <button onClick={() => setPage('add')}>Add book</button>
          <button onClick={logout}>logout</button>
        </>)
        :
        (<button onClick={() => setPage('login')}>login</button>)
        }
      </div>

      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify}/>
      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage}/>

    </div>
  )
}

export default App

