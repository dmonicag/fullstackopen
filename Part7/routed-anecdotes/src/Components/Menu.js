import {  Routes, Route, Link } from 'react-router-dom'
import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'

const Menu = ({ addNew, anecdotes, anecdote}) => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/anecdotes">Anecdotes</Link>
        <Link style={padding} to="/create">Create New</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      </div>
    )
  }

export default Menu