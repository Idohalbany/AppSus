import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemoveNote, onPinNote, onDuplicateNote }) {

    return <ul className="note-list">
        {notes.map(note =>
            <li key={note.id}>
                <NotePreview note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} />
            </li>
        )}
    </ul>
}
