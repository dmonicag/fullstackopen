import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const [books, setBooks] = useState(null)
  const [booksByGenre, setBooksbyGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  const [getBooksbyGenre] = useLazyQuery(ALL_BOOKS, {
    onCompleted: data => setBooksbyGenre(data.allBooks),
    fetchPolicy: "no-cache",
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setBooksbyGenre(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }
  if(result.books){
    return null
  }

  const flattened = books.flatMap((b) => b.genres)
  const genreSet = [...new Set(flattened)].concat('all genres')

  const handleClick = (genre) => {
    setGenre(genre)
    if(genre === 'all genres'){
      setBooksbyGenre(result.data.allBooks)
      return
    }
    getBooksbyGenre({ variables: { genre: genre } })
  }

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
          {booksByGenre         
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
          <button key={b} onClick={() => handleClick(b)}>{b}</button>
        ))}
        
        </p>
      </div>
    </div>
  )
}

export default Books