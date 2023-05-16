import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }
  if(result.books){
    return null
  }

  const books = result.data.allBooks

  const flattened = books.flatMap((b) => b.genres)
  const genreSet = new Set(flattened)

  return (
    <div>
      <h2>Books</h2>
      <h3>By genre</h3>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books
          .filter((a) => (genre !== 'all' ? a.genres.includes(genre) : a)) 
          .map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>
        {Array.from(genreSet).map((b) => (
          <button key={b} onClick={() => setGenre(b)}>{b}</button>
        ))}
        <button onClick={() => setGenre('all')}>all genres</button>
        </p>
      </div>
    </div>
  )
}

export default Books
