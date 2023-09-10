const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function NoteDetails({ noteId, onUpdateNote, onRemoveNote, onDuplicateNote, onPinNote, onSelectColor, setEditingNoteId }) {

    const [note, setNote] = useState(null)
    const [titleInputValue, setTitleInputValue] = useState('')
    const [newTodoValue, setNewTodoValue] = useState('')
    const [descriptionInputValue, setDescriptionInputValue] = useState('')
    const [showColorModal, setShowColorModal] = useState(false)
    const [image, setImage] = useState('')
    const [todos, setTodos] = useState('')
    const navigate = useNavigate()


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

    function onRemoveBtnClicked(ev, noteId) {
        onRemoveNote(ev, noteId)
        setEditingNoteId(null)
        navigate('/note')
    }

    function onInputText({ target: { value } }, field, index = 0) {
        if (!value) return
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
            setTodos(prevTodos => {
                const newTodos = structuredClone(prevTodos)
                newTodos[index].txt = value
                setNote(prevNote => {
                    const newNote = structuredClone(prevNote)
                    newNote.info.todos = newTodos
                    onUpdateNote(newNote)
                    return newNote
                })
                return newTodos
            })
        }
        else if (field === 'newTodo') {
            setTodos(prevTodos => {
                const newTodos = structuredClone(prevTodos)
                newTodos.unshift({ txt: value, doneAt: null })
                setNote(prevNote => {
                    const newNote = structuredClone(prevNote)
                    newNote.info.todos = newTodos
                    onUpdateNote(newNote)
                    return newNote
                })
                return newTodos
            })
            setNewTodoValue('')
        }
    }

    function onChangeTodo(ev, idx, isComplete = false, isDelete = false) {
        ev.stopPropagation()

        if (isDelete) {
            setTodos(prevTodos => {
                const newTodos = structuredClone(prevTodos)
                newTodos.splice(idx, 1)
                console.log('newTodos:', newTodos)
                setNote(prevNote => {
                    const newNote = structuredClone(prevNote)
                    newNote.info.todos = newTodos
                    onUpdateNote(newNote)
                    return newNote
                })
                return newTodos
            })
        }

        else setTodos(prevTodos => {
            const newTodos = structuredClone(prevTodos)
            newTodos[idx].doneAt = isComplete ? Date.now() : null
            setNote(prevNote => {
                const newNote = structuredClone(prevNote)
                newNote.info.todos = newTodos
                onUpdateNote(newNote)
                return newNote
            })
            return newTodos
        })
    }

    if (!note) return <div>Loading..</div>

    return <section className="note-details">

        <div className="pin-card">
            <i className="fa-solid fa-thumbtack btn btn-pin"
                onClick={(ev) => onPinNote(ev, note.id)}>
            </i>
        </div>

        <DynamicCmp
            note={note}
            onInputText={onInputText}
            setNewTodoValue={setNewTodoValue}
            newTodoValue={newTodoValue}
            titleInputValue={titleInputValue}
            descriptionInputValue={descriptionInputValue}
            todos={todos}
            onChangeTodo={onChangeTodo} />

        <div className="note-options">

            <div className="note-controls">
                <i className="fa-solid fa-trash btn btn-remove-note"
                    title="Delete note"
                    onClick={(ev) => onRemoveBtnClicked(ev, note.id)}>
                </i>
                <i className="fa-solid fa-copy btn btn-duplicate-note"
                    title="Duplicate note"
                    onClick={(ev) => onDuplicateNote(ev, note.id)}>
                </i>
                <i className="fa-solid fa-palette btn btn-clr-change"
                    title="Select color"
                    onClick={(ev) => onChangeColorClick(ev)}>
                </i>

                {showColorModal && <NoteColorModal
                    onCloseColorModal={onCloseColorModal}
                    onSelectColor={onSelectColor}
                    note={note} />}
            </div>

            {<div className="last-edited">{utilService.formatDate(note.editedAt || note.createdAt)}</div>}

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
            placeholder="Enter note description..."
            value={descriptionInputValue}
            onChange={(ev) => onInputText(ev, 'description')}
        />

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

function NoteTodos({ note, onInputText, titleInputValue, todos, newTodoValue, setNewTodoValue, onChangeTodo }) {

    return <div className="content">
        <input
            type="text"
            placeholder="Enter Title..."
            value={titleInputValue}
            onChange={(ev) => onInputText(ev, 'title')}
        />
        <ul>
            <li>{note.info.todos.map((todo, idx) => {
                return <div
                    key={idx}
                    className={`todo-item todo-item-${note.id}-${idx}`}>

                    {todo.doneAt ?
                        <i className="fa-solid fa-square-check"
                            title="Mark unchecked"
                            onClick={(ev) => onChangeTodo(ev, idx, false)}>
                        </i>
                        : <i className="fa-regular fa-square-check"
                            title="Mark checked"
                            onClick={(ev) => onChangeTodo(ev, idx, true)}>
                        </i>}

                    <input
                        className={todo.doneAt ? 'crossed' : ''}
                        type="text"
                        placeholder="Enter todo..."
                        value={todos[idx].txt}
                        onChange={(ev) => onInputText(ev, 'todo', idx)}
                    />

                    <p className="date-completed">{`${todo.doneAt ? (utilService.formatDate(todo.doneAt)) : 'Uncompleted'}`}</p>

                    <i className="fa-solid fa-trash btn btn-remove-todo"
                        title="Delete Todo"
                        onClick={(ev) => onChangeTodo(ev, idx, '', true)}>
                    </i>

                </div>

            })}</li>
        </ul>

        <div className="new-todo">
            <i className='bx bx-plus'></i>
            <input type="text" placeholder="Add new TODO..." value={newTodoValue}
                onChange={(ev) => {
                    const value = ev.target.value
                    setNewTodoValue(value)
                }} onBlur={(ev) => onInputText(ev, 'newTodo')} />
        </div>
    </div>
}

function DynamicCmp({ note, onInputText, titleInputValue, descriptionInputValue, todos, newTodoValue, setNewTodoValue, onChangeTodo }) {

    switch (note.type) {

        case 'NoteTxt':
            return <NoteTxt note={note}
                onInputText={onInputText}
                titleInputValue={titleInputValue}
                descriptionInputValue={descriptionInputValue} />
        case 'NoteTodos':
            return <NoteTodos note={note}
                onInputText={onInputText}
                titleInputValue={titleInputValue}
                todos={todos}
                newTodoValue={newTodoValue} setNewTodoValue={setNewTodoValue}
                onChangeTodo={onChangeTodo} />
        case 'NoteImg':
            return <NoteImg note={note}
                onInputText={onInputText}
                titleInputValue={titleInputValue} />
    }
}

function NoteColorModal({ onCloseColorModal, onSelectColor, note }) {
    return <div className="color-modal">
        <div className={`color-modal-content`}>
            <div className="color-options">
                <div className="color-option" onClick={(ev) => onSelectColor(ev, note, 'clr0')}></div>
                <div className="color-option clr1" onClick={(ev) => onSelectColor(ev, note, 'clr1')}></div>
                <div className="color-option clr2" onClick={(ev) => onSelectColor(ev, note, 'clr2')}></div>
                <div className="color-option clr3" onClick={(ev) => onSelectColor(ev, note, 'clr3')}></div>
            </div>
            <button className="btn btn-close-modal" onClick={(ev) => onCloseColorModal(ev)}>Close</button>
        </div>
    </div>
}