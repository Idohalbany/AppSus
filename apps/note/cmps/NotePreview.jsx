const { Fragment } = React

export function NotePreview({ note, onRemoveNote }) {
    return <article className={"note-preview " + note.id}>
        <DynamicCmp note={note} />
        <div className="note-controls">
            <i className=" fa-solid fa-trash btn btn-remove" onClick={() => onRemoveNote(note.id)}></i>
            <i className="fa-solid fa-image btn btn-add-img"></i>
            <i className="fa-solid fa-list btn btn-add-list"></i>
            <i className="fa-solid fa-microphone btn btn-add-audio"></i>
            <i className="fa-solid fa-palette btn btn-clr-change"></i>
        </div>
    </article>
}

function NoteTxt({ note }) {
    return <div className="content">
        <h4>{note.info.txt}</h4>
        <h2>{note.createdAt}</h2>
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
            <li>{note.info.todos.map(todo => todo.txt)}</li>
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