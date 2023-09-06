import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes }) {

    console.log('notes:', notes)
    return <ul className="note-list">
        {notes.map(note =>
            <li key={note.id}>
                <NotePreview note={note} />
            </li>
        )}
    </ul>
}
