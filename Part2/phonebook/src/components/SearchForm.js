import DisplayContacts from "./DisplayContacts";

const SearchForm = ({persons, persons_copy, handleSearch, delete_person}) => {
  //console.log("enter search form")
 
    return (
      <div>
        <table><tbody><tr><td>
        <h3>Search Contact</h3></td>
          <td>
          <p><input value={persons_copy.query} onChange={handleSearch}></input></p>
          </td>
        </tr></tbody></table>
        {(persons_copy.query === '' ?
            (persons.map(per => 
              <DisplayContacts key={per.id} contacts={per} deleteContact={() => delete_person(per.id)}/>
             ) )
            :
           (persons_copy.list.map(pers => 
              <DisplayContacts key={pers.id} contacts={pers} deleteContact={()=>delete_person(pers.id)}/>
            )))}
      </div>
    )
   
  }

export default SearchForm;

/* 
     (
              <DisplayContacts key={persons_copy.list.id} contacts={persons_copy.list} deleteContact={()=>delete_person(persons_copy.list.id)}/>
            ))} */