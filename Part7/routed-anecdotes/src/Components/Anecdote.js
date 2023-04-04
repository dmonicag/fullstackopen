const Anecdote = ({ anecdote }) => {
    return(
      <div>
        <p>
          <b>{anecdote.content}</b>&ensp;
          by &nbsp;
          <b>{anecdote.author}</b>&ensp;
          has {anecdote.votes} votes</p>
       <p>For more info, click &nbsp;
        <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    )
}

export default Anecdote