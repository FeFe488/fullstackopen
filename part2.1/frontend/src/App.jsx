import { useEffect, useState ,useFetch} from "react"
import Note from "./components/Note"
import axios from "axios"
import noteService from './services/notes'
import Notification from "./components/Notification"
import Footer from "./components/Footer"



const App= (props) => {


  const [notes,setNotes]=useState([])
  const [newNote,setNewNote]= useState('')
  const [showAll,setShowAll]= useState(true)
  const [errorMessage, setErrorMessage]=useState('')
  

    useEffect(() => {
      noteService  
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }, [])
    

    

  const addNote=(e)=>{
    e.preventDefault()
    const noteObject={
      content: newNote,
      important: Math.random()>0.5,
    }
    
    noteService
      .create(noteObject) //das noteObject geht an notes.js in axios wo es an backendgesendet wird
      .then(returnedNote=>{  //was von notes.js kommt als retunredNote in newNotes updated mit concat
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      
      })
  }

  

  const toggleImportanceOf=id=>{
    const note= notes.find(n=> n.id===id)
    const changedNote= {...note,important: !note.important}

    noteService
      .update(id,changedNote)
        .then(returnedNote=>{
        setNotes(notes.map(note=> note.id===id? returnedNote: note))
      })
      .catch(error=>{
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        )        
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
        setNotes(notes.filter(n=>n.id!==id))
    })
    } 


  const handleNoteChange=(e)=>{
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const notesToShow= showAll
    ? notes
    : notes.filter(note=> note.important===true) 
  
    return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll? 'important': 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note=> 
            <Note 
              key={note.id}
              note1={note}
              toggleImportance={()=>toggleImportanceOf(note.id)}
              />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>

  )
  
}


export default App




