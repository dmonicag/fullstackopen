const AddPersonForm = ({add_contact}) => {
    return (
      <div>
        <h2>Add new contact</h2>
        <form onSubmit={add_contact}>
          <table><tbody>
          <tr><td>Name: <input name="name"></input></td>
             <td>Number: <input name="number"></input></td></tr>
              </tbody></table>
          <p><button>Add Contact</button></p>
        </form>
      </div>
    )
  }
export default AddPersonForm;