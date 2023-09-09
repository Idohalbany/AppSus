import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteDetails } from '../cmps/NoteDetails.jsx'
import { SideBar } from '../../../cmps/SideBar.jsx'

const { useEffect, useState } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [filterBy, setFilterBy] = useState({ key: '', type: '' })
  const [isContentClass, setIsContentClass] = useState(true)
  const [selectedNoteCategory, setSelectedNoteCategory] = useState('All')
  const params = useParams()
  const navigate = useNavigate()

  const toggleContentClass = () => {
    setIsContentClass((prevState) => !prevState)
  }

  useEffect(() => {
    let filterCriteria = {}

    switch (selectedNoteCategory) {
      case 'Pinned':
        filterCriteria.type = 'pinned'
        break
      case 'Unpinned':
        filterCriteria.type = 'unpinned'
        break
      case 'Text':
        filterCriteria.type = 'NoteTxt'
        break
      case 'Todo':
        filterCriteria.type = 'NoteTodos'
        break
      case 'Images':
        filterCriteria.type = 'NoteImg'
        break
    }

    noteService.query(filterCriteria).then(setNotes)
  }, [selectedNoteCategory])

  useEffect(() => {
    // console.log('MOUNT')
    noteService
      .query(filterBy)
      .then(setNotes)
      .catch((err) => {
        console.log('err:', err)
      })
  }, [filterBy])

  useEffect(() => {
    // console.log('Params?')
    if (params.id) {
      setEditingNoteId(params.id)
      // const note = noteService.get(params.id).then((note) => {
      //     backgroundColorClass = note.style ? note.style.backgroundColor : 'clr0'
      // })
    }
  }, [params.id])

  function findPinned(notes, pinned = true) {
    return notes.filter((note) => note.isPinned === pinned)
  }

  function onAddNote(note) {
    noteService
      .save(note)
      .then((newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote])
      })
      .catch((err) => {
        console.log('err:', err)
        showSuccessMsg('Note Add Unsuccessful')
      })
  }

  function onRemoveNote(ev, noteId) {
    ev.stopPropagation()
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg('Note Removed')
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Note Remove Unsuccessful')
      })
  }

  function onSelectColor(ev, note, clr) {
    ev.stopPropagation()
    note.style = { backgroundColor: clr }
    onUpdateNote(note)
  }

  function onUpdateNote(note) {
    note.editedAt = Date.now()
    noteService
      .save(note)
      .then((savedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
        )
        showSuccessMsg('Note Saved')
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Note Update Unsuccessful')
      })
  }

  function onPinNote(ev, noteId) {
    ev.stopPropagation()
    noteService
      .get(noteId)
      .then((note) => {
        note.isPinned = !note.isPinned
        return noteService.save(note)
      })
      .then((savedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
        )
        showSuccessMsg('Note Pinned')
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Note Pin Unsuccessful')
      })
  }

  function onDuplicateNote(ev, noteId) {
    ev.stopPropagation()
    noteService
      .get(noteId)
      .then((note) => {
        note.id = null
        return noteService.save(note)
      })
      .then((newNote) => {
        setNotes((prevNotes) => [newNote, ...prevNotes])
        showSuccessMsg('Note Duplicated')
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMessage('Note Duplicate Unsuccessful')
      })
  }

  function onSearchNote({ target: { value } }) {
    setFilterBy((prevFilter) => ({ ...prevFilter, key: value }))
  }

  function onFilterNotes({ target: { value } }) {
    // console.log('value:', value)
    setFilterBy((prevFilter) => ({ ...prevFilter, type: value }))
  }

  function handleOverlayClick(ev) {
    if (ev.target === ev.currentTarget) {
      setEditingNoteId(null)
      navigate('/note')
    }
  }

  //   console.log('RENDER')

  if (!notes) return <div className='loading-note-index'>Loading..</div>

  return (
    <div className={`main-note-page-layout app-open ${isContentClass ? 'content' : ''}`}>
      <SideBar
        onCategorySelect={setSelectedNoteCategory}
        toggleContentClass={toggleContentClass}
        className='sidebar-notes'
      />
      <main className='main-note-container'>
        <section className='search-bar-container'>
          <div className='search-bar-content'>
            <input
              type='text'
              value={filterBy.key}
              placeholder='Search note by title...'
              className='search-bar'
              onChange={(ev) => onSearchNote(ev)}
            />
          </div>
        </section>

        {editingNoteId ? (
          <div className='modal edit-note' onClick={handleOverlayClick}>
            <div className={`modal-content`}>
              <NoteDetails
                setEditingNoteId={setEditingNoteId}
                noteId={editingNoteId}
                onUpdateNote={onUpdateNote}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onPinNote={onPinNote}
                onSelectColor={onSelectColor}
              />
            </div>
          </div>
        ) : null}

        <section className='new-note-container'>
          <NoteAdd onAddNote={onAddNote} />
        </section>

        <section className='notes-container'>
          <section className='pinned-notes-container'>
            <h1>PINNED</h1>
            <NoteList
              notes={findPinned(notes, true)}
              onRemoveNote={onRemoveNote}
              onPinNote={onPinNote}
              onDuplicateNote={onDuplicateNote}
              onSelectColor={onSelectColor}
            />
          </section>

          <section className='note-list-container'>
            <h1>UNPINNED</h1>
            <NoteList
              notes={findPinned(notes, false)}
              onRemoveNote={onRemoveNote}
              onPinNote={onPinNote}
              onDuplicateNote={onDuplicateNote}
              onSelectColor={onSelectColor}
            />
          </section>
        </section>
      </main>
    </div>
  )
}

// className={`app-open ${isContentClass ? 'content' : ''}`
