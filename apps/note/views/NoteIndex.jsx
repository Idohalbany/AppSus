import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect, useState } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        console.log('MOUNT')
        noteService.query().then(setNotes)
    }, [])

    function findPinned(notes, pinned = true) {
        return notes.filter(note => note.isPinned === pinned)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            // showSuccessMessage('Note Removed')
        })
    }

    console.log('RENDER')

    if (!notes) return <div>Loading..</div>

    return <main className="main-container">
        <section className="note-input">
            <AddNote />
        </section>
        <section className="notes-container">
            <section className="pinned-notes-container">
                <h1>PINNED!!!</h1>
                <NoteList notes={findPinned(notes, true)} onRemoveNote={onRemoveNote} />
            </section>
            <section className="note-list-container">
                <h1>UNPINNED!!!</h1>
                <NoteList notes={findPinned(notes, false)} onRemoveNote={onRemoveNote} />
            </section>
        </section>
    </main>
}
