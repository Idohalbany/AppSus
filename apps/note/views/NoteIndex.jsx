import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect } = React

export function NoteIndex() {

    useEffect(() => {
        const notes = noteService.query()
        console.log('notes:', notes)
    }, [])

    return <main className="main-container">
        <section className="note-input">
            <AddNote />
        </section>
        <section className="notes-container">
            <section className="pinned-notes-container">Pinned Here</section>
            <section className="note-list-container">
                <NoteList />
            </section>
        </section>
    </main>
}
