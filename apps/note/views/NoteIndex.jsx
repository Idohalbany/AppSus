import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteDetails } from '../cmps/NoteDetails.jsx'

const { useEffect, useState, } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [editingNoteId, setEditingNoteId] = useState(null)
    const [filterBy, setFilterBy] = useState({ key: '', type: '' })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('MOUNT')
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
            })
    }, [filterBy])

    useEffect(() => {
        console.log('Params?')
        if (params.id) setEditingNoteId(params.id)
    }, [params.id])

    function findPinned(notes, pinned = true) {
        return notes.filter(note => note.isPinned === pinned)
    }

    function onAddNote(note) {
        noteService.save(note)
            .then((newNote) => {
                setNotes(prevNotes => [...prevNotes, newNote])
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMessage('Note Add Unsuccessful')
            })
    }

    function onRemoveNote(ev, noteId) {
        ev.stopPropagation()
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMessage('Note Removed')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMessage('Note Remove Unsuccessful')
            })
    }

    function onUpdateNote(note) {
        note.editedAt = Date.now()
        noteService.save(note)
            .then((savedNote) => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) => note.id === savedNote.id ? savedNote : note))
                // showSuccessMessage('Note Saved')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMessage('Note Update Unsuccessful')
            })
    }

    function onPinNote(ev, noteId) {
        ev.stopPropagation()
        noteService.get(noteId)
            .then(note => {
                note.isPinned = !note.isPinned
                return noteService.save(note)
            })
            .then(savedNote => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) => note.id === savedNote.id ? savedNote : note))
                // showSuccessMessage('Note Pinned')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMessage('Note Pin Unsuccessful')
            })
    }

    function onDuplicateNote(ev, noteId) {
        ev.stopPropagation()
        noteService.get(noteId)
            .then(note => {
                note.id = null
                return noteService.save(note)
            })
            .then((newNote) => {
                setNotes((prevNotes) => [newNote, ...prevNotes])
                // showSuccessMessage('Note Duplicated')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMessage('Note Duplicate Unsuccessful')

            })
    }

    function onSearchNote({ target: { value } }) {
        setFilterBy(prevFilter => ({ ...prevFilter, key: value }))
    }

    function onFilterNotes({ target: { value } }) {
        console.log('value:', value)
        setFilterBy(prevFilter => ({ ...prevFilter, type: value }))
    }

    function handleOverlayClick(ev) {
        if (ev.target === ev.currentTarget) {
            setEditingNoteId(null)
            navigate('/note')
        }
    }

    console.log('RENDER')

    if (!notes) return <div>Loading..</div>

    return <main className="main-container">

        <section className="search-bar-container">
            <input type="text" value={filterBy.key} placeholder="Search note by title..." className="search-bar" onChange={(ev) => onSearchNote(ev)} />
            <select name="noteType" onChange={(ev) => onFilterNotes(ev)}>
                <option value="">All</option>
                <option value="pinned">Pinned</option>
                <option value="unpinned">Unpinned</option>
                <option value="text">Text</option>
                <option value="todos">Todos</option>
                <option value="img">Images</option>
            </select>
        </section>

        {editingNoteId ? (
            <div className="modal edit-note" onClick={handleOverlayClick}>
                <div className="modal-content">
                    <NoteDetails noteId={editingNoteId} onUpdateNote={onUpdateNote} />
                </div>
            </div>
        ) : null}

        <section className="new-note-container">
            <NoteAdd onAddNote={onAddNote} />
        </section>

        <section className="notes-container">
            <section className="pinned-notes-container">
                <h1>PINNED!!!</h1>
                <NoteList notes={findPinned(notes, true)} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} />
            </section>

            <section className="note-list-container">
                <h1>UNPINNED!!!</h1>
                <NoteList notes={findPinned(notes, false)} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} />
            </section>
        </section>

    </main>
}