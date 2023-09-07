const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {

    const [titleInputValue, setTitleInputValue] = useState('')
    const [descriptionInputValue, setDescriptionInputValue] = useState('')

    // ADD IMAGE TO MAILSSS

    function handleAddNote() {

        let note

        switch (noteType) {
            case 'NoteTxt':
                note = noteService.getEmptyNote('NoteTxt')
                note.info.title = titleInputValue || 'No Title'
                note.info.txt = descriptionInputValue || 'No Description'
                break
            case 'NoteImg':
                note.info.title = titleInputValue || 'No Title'
                // ADD IMAGE TO MAILSSS
                // note.info.url = ????????
                // ADD IMAGE TO MAILSSS
                break
            case 'NoteTodos':
                note.info.title = titleInputValue || 'No Title'
                /// HANDLE TODOLIST
                break
            default:
                note = noteService.getEmptyNote('NoteTxt')
                note.info.title = titleInputValue || 'No Title'
                note.info.txt = descriptionInputValue || 'No Description'
        }

        onAddNote(note)
        clearInputs()
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

    return <section className="add-note">

        <div className="pin-card">
            <i className="fa-solid fa-thumbtack btn btn-pin" onClick={(ev) => onPinNote(ev, note.id)}></i>
        </div>

        <input
            type="text"
            placeholder="Enter note title..."
            value={titleInputValue}
            onChange={(ev) => onInputText(ev, 'title')}
        />

        <input
            type="text"
            placeholder="Enter note description..."
            value={descriptionInputValue}
            onChange={(ev) => onInputText(ev, 'description')}
        />

        <div className="note-controls">
            <i className="fa-solid fa-image btn btn-add-img"></i>
            <i className="fa-solid fa-list btn btn-add-list"></i>
            <i className="fa-solid fa-palette btn btn-clr-change"></i>
        </div>

        <button className="btn btn-add-note" onClick={() => handleAddNote()}>
            Add Note
        </button>

    </section>
}


