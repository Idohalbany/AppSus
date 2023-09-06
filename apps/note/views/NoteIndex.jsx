import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect, useState } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        console.log('MOUNT')
        noteService.query().then(setNotes)
    }, [])


    console.log('RENDER')

    if (!notes) return <div>Loading..</div>

    return <main className="main-container">
        <section className="note-input">
            <AddNote />
        </section>
        <section className="notes-container">
            <section className="pinned-notes-container">Pinned Here</section>
            <section className="note-list-container">
                <NoteList notes={notes} />
            </section>
        </section>
    </main>
}
