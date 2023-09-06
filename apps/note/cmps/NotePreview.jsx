const { Fragment } = React

export function NotePreview({ note, onRemoveNote }) {

    return <article className={"note-preview " + note.id}>
        <DynamicCmp note={note} />
        <button className="btn-remove" onClick={() => onRemoveNote(note.id)}>Delete</button>
        <button className="btn-add-img">Add Image</button>
        <button className="btn-add-list">Make List</button>
        <button className="btn-add-audio">Add Audio</button>
        <button className="btn-clr-change">Change Color</button>
    </article>
}

function NoteTxt({ note }) {
    return <Fragment>
        <h1>{note.info.txt}</h1>
        <h2>{note.createdAt}</h2>
    </Fragment>

}

function NoteImg({ note }) {
    return <Fragment>
        <h1>{note.info.title}</h1>
        <img src={note.info.url} alt="image" />
    </Fragment>
}

function NoteTodos({ note }) {
    return <Fragment>
        <h1>{note.info.title}</h1>
        <ul>
            <li>{note.info.todos.map(todo => todo.txt)}</li>
        </ul>
    </Fragment>
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