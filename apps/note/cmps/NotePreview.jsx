const { Fragment } = React

export function NotePreview({ note }) {

    return <article className={"note-preview " + note.id}>
        <DynamicCmp note={note} />
    </article>
}

function NoteTxt({ note }) {
    console.log('noteTxt:', note)
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