const DisplayContacts = ({contacts, deleteContact}) => {
    return (
      <div>
        <ul>       
            <li key={contacts.id}>{contacts.name} {contacts.number}
            <button onClick={deleteContact} value={contacts.id}>Delete</button>
            </li>          
        </ul>
      </div>
    )
  }
export default DisplayContacts;  
