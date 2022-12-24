/**
 * Author: Jasper Rowan
 * 
 * This is a simple react front end to experiment with
 * fetching data from a server. To start we will be fetching
 * data from a locally hosted server called json server.
 * 
 * json server 
 * can be installed golbally with:
 * npm install -g json-server, however a global install is
 * not necessary, usually you can just run it from the root
 * dir of yout project with the command:
 * 
 * npx json-server --port 3001 --watch db.json
 * Note your db.json file will be created and you can fill
 * it with a json object if you want.
 * 
 * Axios
 * We will be using the axios library instead of fetch for
 * communication between the browser and server. It
 * functions like fetch, but is somewhat more pleasant to
 * use.
 * 
 * npm install axios
 * 
 * Use Effect Hook
 * The Effect Hook lets you perform side effects on function
 * components. Data fetching, setting up a subscription, and
 * manually changing the DOM in React components are all
 * examples of side effects.
 * 
 * As such, effect hooks are precisely the right tool to use
 * when fetching data from a server.
 * 
 * useEffect(hook, [])
 * 
 * Now we can see more clearly that the function useEffect
 * actually takes two parameters. The first is a function,
 * the effect itself. According to the documentation: By
 * default, effects run after every completed render, but
 * you can choose to fire it only when certain values have
 * changed. So by default the effect is always run after the
 * component has been rendered. In our case, however, we
 * only want to execute the effect along with the first
 * render. The second parameter of useEffect is used to
 * specify how often the effect is run. If the second
 * parameter is an empty array [], then the effect is only
 * run along with the first render of the component.
 */ 

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Test')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  }
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(noteObject));
      setNewNote('')
    })
  
  }

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
         />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App