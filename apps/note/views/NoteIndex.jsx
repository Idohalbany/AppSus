import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect, useState } = React
const { useOutletContext, useParams, Outlet } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [editingNoteId, setEditingNoteId] = useState(null)
    const params = useParams()

    useEffect(() => {
        console.log('MOUNT')
        noteService.query().then(setNotes)
    }, [])

    useEffect(() => {
        console.log('Params?')
        if (params.id) setEditingNoteId(params.id)
    }, [params.id])

    function findPinned(notes, pinned = true) {
        return notes.filter(note => note.isPinned === pinned)
    }

    function onAddNote(txt) {
        // if note.type = ...
        const note = noteService.getEmptyNote()
        note.info.txt = txt
        noteService.save(note).then((newNote) => {
            setNotes(prevNotes => [...prevNotes, newNote])
        })
    }

    function onRemoveNote(ev, noteId) {
        ev.stopPropagation()
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            // showSuccessMessage('Note Removed')
        })
    }

    function onPinNote() {

    }

    console.log('RENDER')

    if (!notes) return <div>Loading..</div>

    return <main className="main-container">

        {editingNoteId ? (
            <div className="modal edit-note">
                <div className="modal-content">
                    <NoteEdit
                        noteId={editingNoteId}
                        onCloseModal={() => setEditingNoteId(null)}
                    />
                </div>
            </div>
        ) : null}

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