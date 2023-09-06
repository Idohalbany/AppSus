const { useState } = React

export function NoteEdit({ onAddNote, noteId = null }) {

    const [inputValue, setInputValue] = noteId ? useState('FUCKMYLIFE(FIND NOTE)') : useState('')

    function onInputText({ target: { value } }) {
        setInputValue(value)
    }

    return <section className={noteId ? "edit-note edit-mode" : "edit-note"}>
        <input type="text" placeholder="Enter note..." value={inputValue} onChange={(ev) => onInputText(ev)} />
        <button className="btn btn-add-note" onClick={() => onAddNote(inputValue)}>Add Note</button>
    </section>
}