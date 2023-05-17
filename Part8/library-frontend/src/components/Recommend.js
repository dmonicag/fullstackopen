import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
    const user = useQuery(CURRENT_USER)
    const result = useQuery(ALL_BOOKS)

    if(!props.show || !user.data || !result.data){
        return null
    }
    const favoriteGenre = user.data.me.favoriteGenre
    
    const books = result.data.allBooks    
    const recommendations = books.filter((a) => a.genres.includes(favoriteGenre))

    return(
        <div>
            <h3>Books in your favourite genre</h3>
            <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommendations 
          .map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          
        </tbody>
      </table>

        </div>
    )
}

export default Recommend