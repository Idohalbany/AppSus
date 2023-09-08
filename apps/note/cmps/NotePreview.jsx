const { useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote, onPinNote, onDuplicateNote }) {

    const navigate = useNavigate()
    const backgroundColorClass = note.style ? note.style.backgroundColor : ''
    const [showColorModal, setShowColorModal] = useState(false)
    const [addNoteColor, setAddNoteColor] = useState('')

    useEffect(() => {
        setAddNoteColor(addNoteColor)
    }, [addNoteColor])

    function onEditNoteClick(note) {
        navigate(`/note/edit/${note.id}`)
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


    return <li key={note.id} className={`note-preview ${backgroundColorClass} ${note.id}`} onClick={() => onEditNoteClick(note)}>
        <div className="pin-card">
            <i className="fa-solid fa-thumbtack btn btn-pin" onClick={(ev) => onPinNote(ev, note.id)}></i>
        </div>
        <DynamicCmp note={note} />
        <div className="note-controls">
            <i className="fa-solid fa-trash btn btn-remove" onClick={(ev) => onRemoveNote(ev, note.id)}></i>
            <i className="fa-solid fa-copy btn btn-duplicate-note" onClick={(ev) => onDuplicateNote(ev, note.id)}></i>
            <i className="fa-solid fa-image btn btn-add-img"></i>
            <i className="fa-solid fa-palette btn btn-clr-change" onClick={(ev) => onChangeColorClick(ev)}></i>
            {showColorModal && <NoteColorModal setShowColorModal={() => setShowColorModal(false)} onSelectColor={onSelectColor} />}
        </div>
    </li>
}

function NoteTxt({ note }) {
    return <div className="content">
        <h4>{note.info.title}</h4>
        <h2>{note.info.txt}</h2>
        <h2>{note.editedAt || note.createdAt}</h2>
    </div>

}

function NoteImg({ note }) {
    return <div className="content">
        <img className="image" src={note.info.url} alt="image" />
        <h4>{note.info.title}</h4>
    </div>
}

function NoteTodos({ note }) {
    return <div className="content">
        <h4>{note.info.title}</h4>
        <ul>
            <li>{note.info.todos.map(todo => `${todo.txt} Complited: ${todo.doneAt}\n`)}</li>
        </ul>
    </div>
}

function DynamicCmp({ note }) {

    switch (note.type) {

        case 'NoteTxt':
            return <NoteTxt note={note} />
        case 'NoteTodos':
            return <NoteTodos note={note} />
        case 'NoteImg':
            return <NoteImg note={note} />
    }
}

function NoteColorModal({ setShowColorModal, onSelectColor }) {
    return <div className="color-modal">
        <div className="modal-content">
            <h2>Select a Color</h2>
            <div className="color-options">
                <div className="color-option" onClick={(ev) => onSelectColor(ev, '')}></div>
                <div className="color-option clr1" onClick={(ev) => onSelectColor(ev, 'clr1')}></div>
                <div className="color-option clr2" onClick={(ev) => onSelectColor(ev, 'clr2')}></div>
                <div className="color-option clr3" onClick={(ev) => onSelectColor(ev, 'clr3')}></div>
            </div>
            <button className="btn btn-close-modal" onClick={setShowColorModal}>Close</button>
        </div>
    </div>
}
