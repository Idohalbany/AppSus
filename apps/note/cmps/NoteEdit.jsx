const { useState, useEffect } = React
const { useOutletContext } = ReactRouterDOM
import { noteService } from "../services/note.service.js"

export function NoteEdit({ onAddNote, noteId, onCloseModal }) {

    const [inputValue, setInputValue] = useState('')
    const [note, setNote] = useState(null)
    // const noteId = useOutletContext()
    console.log('noteId:', noteId)
    const [showModal, setShowModal] = useState(noteId)

    useEffect(() => {
        if (noteId) loadNote(noteId)
    }, [noteId])

    function loadNote(noteId) {
        noteService.get(noteId).then((note) => setInputValue(note.info.txt))
    }

    function onSaveNote() {
        // Save the updated note or add a new note based on the presence of noteId
        if (noteId) {
            // Update existing note
            // noteService.update(noteId, { info: { txt: inputValue } }).then(() => {
            //     onCloseModal() // Close the modal after saving
            // })
            onCloseModal()
        } else {
            // Add a new note
            onAddNote(inputValue)
            setInputValue('') // Clear the input field
        }
    }

    function onInputText({ target: { value } }) {
        setInputValue(value)
    }

    return <div>

        <section className="edit-note">
            <input
                type="text"
                placeholder="Enter note..."
                value={inputValue}
                onChange={(ev) => onInputText(ev)}
            />
            <button className="btn btn-edit-note" onClick={onSaveNote}>
                {noteId ? 'Save Note' : 'Add Note'}
            </button>
        </section>


    </div>
}