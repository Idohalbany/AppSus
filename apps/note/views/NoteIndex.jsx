import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect, useState } = React
const { useParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const params = useParams()

    useEffect(() => {
        console.log('MOUNT')
        noteService.query().then(setNotes)
    }, [])

    useEffect(() => {
        console.log('Params?')
        if (params.id) onEditNote(params.id)
    }, [params.id])

    function findPinned(notes, pinned = true) {
        return notes.filter(note => note.isPinned === pinned)
    }

    function onEditNote(noteId = null) {
        setIsEdit(prevEdit => !prevEdit)
    }

    function onAddNote(txt) {
        // if note.type = ...
        const note = noteService.getEmptyNote()
        note.info.txt = txt
        noteService.save(note).then((newNote) => {
            setNotes(prevNotes => [...prevNotes, newNote])
        })
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

        {isEdit && <NoteEdit noteId={params.id} />}

        <section className="note-input">
            <NoteEdit onAddNote={onAddNote} />
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
