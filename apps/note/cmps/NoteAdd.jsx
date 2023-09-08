const { useState, useEffect } = React
const { Fragment } = React
import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {

    const [note, setNote] = useState(noteService.getEmptyNote('NoteTxt'))
    const [inputMode, setInputMode] = useState('NoteTxt')
    const [titleInputValue, setTitleInputValue] = useState('')
    const [descriptionInputValue, setDescriptionInputValue] = useState('')
    const [showColorModal, setShowColorModal] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const [addNoteColor, setAddNoteColor] = useState('clr0')

    // ADD IMAGE TO MAILSSS

    function handleAddNote() {
        console.log('YESSSSSSSSS')
        switch (inputMode) {
            case 'NoteTxt':
                noteService.getEmptyNote('NoteTxt')
                setNote(() => {
                    const newNote = noteService.getEmptyNote('NoteTxt')
                    newNote.info.title = titleInputValue || 'No Title'
                    // console.log('newNote:', newNote)
                    onAddNote(newNote)
                    return newNote
                })
                // note.info.title = titleInputValue || 'No Title'
                // note.info.txt = descriptionInputValue || 'No Description'
                break
            case 'NoteImg':
                // note.info.title = titleInputValue || 'No Title'
                // ADD IMAGE TO MAILSSS
                // note.info.url = ????????
                // ADD IMAGE TO MAILSSS
                break
            case 'NoteTodos':
                // note.info.title = titleInputValue || 'No Title'
                /// HANDLE TODOLIST
                break
            default:
            // note = noteService.getEmptyNote('NoteTxt')
            // note.info.title = titleInputValue || 'No Title'
            // note.info.txt = descriptionInputValue || 'No Description'
        }
        clearInputs()
    }

    useEffect(() => {
        setAddNoteColor(addNoteColor)
    }, [addNoteColor])

    function onPinClick(ev) {
        ev.stopPropagation()
        setIsPinned(prevIsPinned => {
            const newIsPinned = !prevIsPinned
            setNote(prevNote => {
                const newNote = { ...prevNote }
                newNote.isPinned = newIsPinned
                return newNote
            })
            return newIsPinned
        })
    }

    function onAddImageClick(ev) {
        ev.stopPropagation()
        setInputMode('NoteImg')
    }

    function onAddTodosClick(ev) {
        ev.stopPropagation()
        setInputMode('NoteTodos')
    }

    function onChangeColorClick(ev) {
        ev.stopPropagation()
        setShowColorModal(true)
    }

    function onSelectColor(ev, clr) {
        ev.stopPropagation()
        setNote(prevNote => {
            const newNote = { ...prevNote }
            newNote.style.backgroundColor = clr
            return newNote
        })
        setAddNoteColor(clr)
    }

    function clearInputs() {
        setTitleInputValue('')
        setDescriptionInputValue('')
    }

    function onInputText({ target: { value } }, field) {
        if (field === 'title') setTitleInputValue(value)
        else if (field === 'description') setDescriptionInputValue(value)
        else return
    }

    return <Fragment>
        <section className={`add-note ${addNoteColor}`}>

            {/* <div className="pin-card">
                <i className="fa-solid fa-thumbtack btn btn-pin" onClick={(ev) => onPinClick(ev)}></i>
            </div> */}

            <input
                type="text"
                placeholder={
                    (inputMode === 'NoteTxt') && "Enter note title..." ||
                    (inputMode === 'NoteImg') && "Enter image URL..." ||
                    (inputMode === 'NoteTodos') && "Enter TODO title..."
                }
                value={titleInputValue}
                onChange={(ev) => onInputText(ev, 'title')}
                onBlur={() => handleAddNote()}
            />

            {/* <input
                type="text"
                placeholder="Enter note description..."
                value={descriptionInputValue}
                onChange={(ev) => onInputText(ev, 'description')}
            /> */}

            <div className="note-controls">
                <i className="fa-solid fa-image btn btn-add-img" onClick={(ev) => onAddImageClick(ev)}></i>
                <i className="fa-solid fa-list btn btn-add-list" onClick={(ev) => onAddTodosClick(ev)}></i>
                <i className="fa-solid fa-palette btn btn-clr-change" onClick={(ev) => onChangeColorClick(ev)}></i>
                {showColorModal && <NoteColorModal setShowColorModal={() => setShowColorModal(false)} onSelectColor={onSelectColor} />}
            </div>

            {/* <button className="btn btn-add-note" onClick={() => handleAddNote()}>
                Add Note
            </button> */}

        </section>
    </Fragment>
}

function NoteColorModal({ setShowColorModal, onSelectColor }) {
    return <div className="color-modal">
        <div className="modal-content">
            <div className="color-options">
                <div className="color-option" onClick={(ev) => onSelectColor(ev, 'clr0')}></div>
                <div className="color-option clr1" onClick={(ev) => onSelectColor(ev, 'clr1')}></div>
                <div className="color-option clr2" onClick={(ev) => onSelectColor(ev, 'clr2')}></div>
                <div className="color-option clr3" onClick={(ev) => onSelectColor(ev, 'clr3')}></div>
            </div>
            <button className="btn btn-close-modal" onClick={setShowColorModal}>Close</button>
        </div>
    </div>
}
