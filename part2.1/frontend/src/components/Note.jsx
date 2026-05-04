

const Note=({note1,toggleImportance})=>{
    const label= note1.important
        ?'make not important': 'make important'

    return(
    <li className="note">
        {note1.content}
    <button onClick={toggleImportance}>{label}</button>
    </li>
)
}

export default Note