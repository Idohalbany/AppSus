const { useNavigate, Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onPinNote, onDuplicateNote }) {

    const navigate = useNavigate()
    const backgroundColorClass = note.style ? note.style.backgroundColor : ''


    function onEditNoteClick(note) {
        navigate(`/note/edit/${note.id}`)
    }

    return <article className={`note-preview ${backgroundColorClass} ${note.id}`} onClick={() => onEditNoteClick(note)}>
        <div className="pin-card">
            <i className="fa-solid fa-thumbtack btn btn-pin" onClick={(ev) => onPinNote(ev, note.id)}></i>
        </div>
        <DynamicCmp note={note} />
        <div className="note-controls">
            <i className="fa-solid fa-trash btn btn-remove" onClick={(ev) => onRemoveNote(ev, note.id)}></i>
            <i className="fa-solid fa-copy btn btn-duplicate-note" onClick={(ev) => onDuplicateNote(ev, note.id)}></i>
            <i className="fa-solid fa-image btn btn-add-img"></i>
            <i className="fa-solid fa-list btn btn-add-list"></i>
            <i className="fa-solid fa-microphone btn btn-add-audio"></i>
            <i className="fa-solid fa-palette btn btn-clr-change"></i>
        </div>
    </article>
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