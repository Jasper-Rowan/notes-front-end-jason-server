/**
 * Author: Jasper Rowan
 * 
 * This is a simple react front end to experiment with
 * fetching data from a server. To start we will be fetching
 * data from a locally hosted server called json server.
 * 
 * json server 
 * can be installed globally with:
 * npm install -g json-server, however a global install is
 * not necessary, usually you can just run it from the root
 * dir of your project with the command:
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
 * We use the axios.get() method to send a get request to
 * our json server followed by a .then() callback function
 * which registers a callback which will fire when the
 * server sends a response. This is all done in Use Effect
 * Hook, see below for reasoning.
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
 * 
 * Forms
 * We added a form that allows the user to create new notes
 * consisting of a input and submit button. We added a
 * newNote state variable to store the value in the input
 * field, this set up a relationship where the component
 * took over the state of the form and the input became read
 * only until we registered and onchange handler. See the
 * forms section of the fullstack course to understand in
 * more detail.
 */ 

import react from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = react.useState([])
  const [newNote, setNewNote] = react.useState('Test')
  const [showAll, setShowAll] = react.useState(true)

  react.useEffect(() => {
    noteService.getAll()
      .then(notes => {
        setNotes(notes)
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

    noteService.create(noteObject)
    .then(newNote => {
      setNotes(notes.concat(newNote));
      setNewNote('')
    })
  
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService.update(id, changedNote)
    .then(updatedNote => {
      setNotes(notes.map(n => n.id !== id ? n : updatedNote))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server, also heres the error: ${error}`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
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