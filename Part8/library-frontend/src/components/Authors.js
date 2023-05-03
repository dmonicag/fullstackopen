import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN_YEAR } from '../queries'
import { useState } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [ changeYear ] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  if (!props.show) {
    return null
  }
  if(result.loading){
    return null
  }

  const authors = result.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()
    changeYear({ variables: { name: author, setBornTo: Number(year) } })
    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>set birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
        <select value={author} onChange={({ target }) => setAuthor(target.value)}>
        <option value="">select author</option>       
          {
            authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))
          }
        </select>
        <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
