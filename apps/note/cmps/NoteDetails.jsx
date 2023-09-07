const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteDetails({ noteId, onUpdateNote }) {

    const [note, setNote] = useState(null)
    const [titleInputValue, setTitleInputValue] = useState('')
    const [descriptionInputValue, setDescriptionInputValue] = useState('')
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

    function onInputText({ target: { value } }, field) {
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
            //FUCK MY LIFE IM DEAD
        }
    }

    if (!note) return <div>Loading..</div>

    return <section className="note-details">

        <div className="pin-card">
            <i className="fa-solid fa-thumbtack btn btn-pin" ></i>
        </div>

        <DynamicCmp note={note} onInputText={onInputText} titleInputValue={titleInputValue} descriptionInputValue={descriptionInputValue} />

        <div className="note-controls">
            <i className="fa-solid fa-image btn btn-add-img"></i>
            <i className="fa-solid fa-list btn btn-add-list"></i>
            <i className="fa-solid fa-palette btn btn-clr-change"></i>
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

function NoteTodos({ note, onInputText, titleInputValue }) {
    return <div className="content">
        <input
            type="text"
            placeholder="Enter Title..."
            value={titleInputValue}
            onChange={(ev) => onInputText(ev, 'title')}
        />
        <ul>
            <li>{note.info.todos.map((todo, idx) => {
                console.log('todo:', todo)
                return <div key={idx} className={`todo-item-${note.id}`}>
                    <input
                        type="text"
                        placeholder="Enter todo..."
                        value={todo.txt}
                        onChange={(ev) => onInputText(ev, 'todo')}
                    />
                    <p>{`Completed at: ${todo.doneAt ? todo.doneAt : 'Not yet'}`}</p>
                </div>
            })}</li>
        </ul>
    </div>
}

function DynamicCmp({ note, onInputText, titleInputValue, descriptionInputValue }) {

    switch (note.type) {

        case 'NoteTxt':
            return <NoteTxt note={note} onInputText={onInputText} titleInputValue={titleInputValue} descriptionInputValue={descriptionInputValue} />
        case 'NoteTodos':
            return <NoteTodos note={note} onInputText={onInputText} titleInputValue={titleInputValue} />
        case 'NoteImg':
            return <NoteImg note={note} onInputText={onInputText} titleInputValue={titleInputValue} />
    }
}