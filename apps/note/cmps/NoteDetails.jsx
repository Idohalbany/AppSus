const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteDetails({ noteId, onUpdateNote, onRemoveNote, onDuplicateNote, onPinNote, onSelectColor }) {

    const [note, setNote] = useState(null)
    const [titleInputValue, setTitleInputValue] = useState('')
    const [descriptionInputValue, setDescriptionInputValue] = useState('')
    const [showColorModal, setShowColorModal] = useState(false)
    const [image, setImage] = useState('')
    const [todos, setTodos] = useState('')

    useEffect(() => {
        noteService.get(noteId).then((note) => {
            setNote(note)

            setTitleInputValue(note.info.title)

            switch (note.type) {
                case 'NoteTxt':
                    setDescriptionInputValue(note.info.txt)
                    break
                case 'NoteImg':
                    setImage(note.info.url)
                    break
                case 'NoteTodos':
                    setTodos(note.info.todos)
                    break
            }
        })
    }, [noteId])

    function onChangeColorClick(ev) {
        ev.stopPropagation()
        setShowColorModal(true)
    }

    function onCloseColorModal(ev) {
        ev.stopPropagation()
        setShowColorModal(false)
    }

    function onInputText({ target: { value } }, field, index = 0) {
        if (field === 'title') {
            setTitleInputValue(value)
            setNote(prevNote => {
                const newNote = { ...prevNote }
                newNote.info.title = value
                return newNote
            })
            onUpdateNote(note)
        }
        else if (field === 'description') {
            setDescriptionInputValue(value)
            setNote(prevNote => {
                const newNote = { ...prevNote }
                newNote.info.txt = value
                return newNote
            })
            onUpdateNote(note)
        }
        else if (field === 'todo') {
            setTodos(prevTodos => prevTodos[index].txt = value)
            setNote(prevNote => {
                const newNote = { ...prevNote }
                newNote.info.txt = value
                return newNote
            })
            onUpdateNote(note)
        }
    }

    if (!note) return <div>Loading..</div>

    return <section className="note-details">

        <div className="pin-card">
            <i className="fa-solid fa-thumbtack btn btn-pin" onClick={(ev) => onPinNote(ev, note.id)}></i>
        </div>

        <DynamicCmp note={note} onInputText={onInputText} titleInputValue={titleInputValue} descriptionInputValue={descriptionInputValue} todos={todos} />

        <div className="note-controls">
            <i className="fa-solid fa-trash btn btn-remove" onClick={(ev) => onRemoveNote(ev, note.id)}></i>
            <i className="fa-solid fa-copy btn btn-duplicate-note" onClick={(ev) => onDuplicateNote(ev, note.id)}></i>
            <i className="fa-solid fa-palette btn btn-clr-change" onClick={(ev) => onChangeColorClick(ev)}></i>
            {showColorModal && <NoteColorModal onCloseColorModal={onCloseColorModal} onSelectColor={onSelectColor} note={note} />}
        </div>

    </section>
}

function NoteTxt({ note, onInputText, titleInputValue, descriptionInputValue }) {
    return <div className="content">
        <input
            type="text"
            placeholder="Enter Title..."
            value={titleInputValue}
            onChange={(ev) => onInputText(ev, 'title')}
        />
        <input
            type="text"
            placeholder="Enter note..."
            value={descriptionInputValue}
            onChange={(ev) => onInputText(ev, 'description')}
        />
        <h2>{note.editedAt || note.createdAt}</h2>
    </div>
}

function NoteImg({ note, onInputText, titleInputValue }) {
    return <div className="content">
        <img className="image" src={note.info.url} alt="image" />
        <input
            type="text"
            placeholder="Enter Title..."
            value={titleInputValue}
            onChange={(ev) => onInputText(ev, 'title')}
        />
    </div>
}

function NoteTodos({ note, onInputText, titleInputValue, todos }) {
    return <div className="content">
        <input
            type="text"
            placeholder="Enter Title..."
            value={titleInputValue}
            onChange={(ev) => onInputText(ev, 'title')}
        />
        <ul>
            <li>{note.info.todos.map((todo, idx) => {
                return <div key={idx} className={`todo-item-${note.id}`}>
                    <input
                        type="text"
                        placeholder="Enter todo..."
                        value={todos[idx].txt}
                        onChange={(ev) => onInputText(ev, 'todo', idx)}
                    />
                    <p>{`Completed at: ${todo.doneAt ? todo.doneAt : 'Not yet'}`}</p>
                </div>
            })}</li>
        </ul>
    </div>
}

function DynamicCmp({ note, onInputText, titleInputValue, descriptionInputValue, todos }) {

    switch (note.type) {

        case 'NoteTxt':
            return <NoteTxt note={note} onInputText={onInputText} titleInputValue={titleInputValue} descriptionInputValue={descriptionInputValue} />
        case 'NoteTodos':
            return <NoteTodos note={note} onInputText={onInputText} titleInputValue={titleInputValue} todos={todos} />
        case 'NoteImg':
            return <NoteImg note={note} onInputText={onInputText} titleInputValue={titleInputValue} />
    }
}

function NoteColorModal({ onCloseColorModal, onSelectColor, note }) {
    return <div className="color-modal">
        <div className={`modal-content`}>
            <h2>Select a Color</h2>
            <div className="color-options">
                <div className="color-option" onClick={(ev) => onSelectColor(ev, note, '')}></div>
                <div className="color-option clr1" onClick={(ev) => onSelectColor(ev, note, 'clr1')}></div>
                <div className="color-option clr2" onClick={(ev) => onSelectColor(ev, note, 'clr2')}></div>
                <div className="color-option clr3" onClick={(ev) => onSelectColor(ev, note, 'clr3')}></div>
            </div>
            <button className="btn btn-close-modal" onClick={(ev) => onCloseColorModal(ev)}>Close</button>
        </div>
    </div>
}