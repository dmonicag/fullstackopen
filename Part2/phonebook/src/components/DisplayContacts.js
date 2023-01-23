const DisplayContacts = ({contacts, deleteContact}) => {
   // console.log("display")
    //console.log(contacts)
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

/*

  {contacts.map(p => (
            <li key={p.id}>{p.name} {p.number}
            <button onClick={deleteContact} value={p.id}>Delete</button>
            </li>
          ))}*/