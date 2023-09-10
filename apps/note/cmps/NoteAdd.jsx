const { useState, useEffect } = React
const { Fragment } = React
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {

    const [note, setNote] = useState(noteService.getEmptyNote('NoteTxt'))
    const [inputMode, setInputMode] = useState('NoteTxt')
    const [titleInputValue, setTitleInputValue] = useState('')
    const [descriptionInputValue, setDescriptionInputValue] = useState('')
    const [showColorModal, setShowColorModal] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const [addNoteColor, setAddNoteColor] = useState('clr0')

    function handleAddNote() {

        switch (inputMode) {
            case 'NoteTxt':
                noteService.getEmptyNote('NoteTxt')
                setNote(() => {
                    const newNote = noteService.getEmptyNote('NoteTxt')
                    newNote.info.title = titleInputValue || 'No Title'
                    newNote.isPinned = isPinned
                    newNote.style = { backgroundColor: addNoteColor }
                    onAddNote(newNote)
                    return newNote
                })
                break
            case 'NoteImg':
                noteService.getEmptyNote('NoteImg')
                setNote(() => {
                    const newNote = noteService.getEmptyNote('NoteImg')
                    newNote.info.url = titleInputValue || 'No Title'
                    newNote.isPinned = isPinned
                    newNote.style = { backgroundColor: addNoteColor }
                    onAddNote(newNote)
                    return newNote
                })
                break
            case 'NoteTodos':
                noteService.getEmptyNote('NoteTxt')
                setNote(() => {
                    const newNote = noteService.getEmptyNote('NoteTxt')
                    newNote.info.title = titleInputValue || 'No Title'
                    newNote.isPinned = isPinned
                    newNote.style = { backgroundColor: addNoteColor }
                    onAddNote(newNote)
                    return newNote
                })
                break

        }
        showSuccessMsg('Note Added')
        clearInputs()
    }

    useEffect(() => {
        setAddNoteColor(addNoteColor)
    }, [addNoteColor])

    function onPinClick(ev) {
        ev.stopPropagation()
        setIsPinned(prevIsPinned => {
            const newIsPinned = !prevIsPinned
            return newIsPinned
        })
        showSuccessMsg('Note Pinned')
    }

    function onAddTextNoteClick(ev) {
        ev.stopPropagation()
        setInputMode('NoteTxt')
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
        setIsPinned(false)
        setAddNoteColor('clr0')
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

            <div className="note-controls">
                <i className="fa-solid fa-font btn btn-add-note-txt"
                    title="Add simple note"
                    onClick={(ev) => onAddTextNoteClick(ev)}>
                </i>

                <i className="fa-solid fa-image btn btn-add-img"
                    title="Add image note"
                    onClick={(ev) => onAddImageClick(ev)}>
                </i>

                <i className="fa-solid fa-list btn btn-add-list"
                    title="Add list note"
                    onClick={(ev) => onAddTodosClick(ev)}>
                </i>

                <i className="fa-solid fa-thumbtack btn btn-pin"
                    title="Pin note"
                    onClick={(ev) => onPinClick(ev)}>
                </i>

                <i className="fa-solid fa-palette btn btn-clr-change"
                    title="Select note color"
                    onClick={(ev) => onChangeColorClick(ev)}>
                </i>

                {showColorModal
                    && <NoteColorModal
                        setShowColorModal={() => setShowColorModal(false)}
                        onSelectColor={onSelectColor} />}

            </div>
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
