import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemoveNote, onPinNote, onDuplicateNote, onSelectColor }) {

    return <ul className="note-list">
        {notes.map(note =>
            <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} onSelectColor={onSelectColor} />
        )}
    </ul>
}
