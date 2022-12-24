/**
 * A Note which contains text content and a button to change
 * its importance.
 * 
 * @param {note, toggleImportance} 
 * 
 * note is a object that has a minimum of and id,
 * importance, and content.
 * 
 * toggleImportance is a reference to a callback function
 * that will be called when the importance button is
 * clicked.
 * @returns a note to be rendered. 
 */
const Note = ({ note, toggleImportance }) => {
    const label = note.important
      ? 'make not important' : 'make important'
  
    return (
      <li>
        {note.content} 
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
  
  export default Note