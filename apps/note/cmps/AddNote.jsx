const { useState } = React

export function AddNote({ onAddNote }) {

    const [inputValue, setInputValue] = useState('')

    function onInputText({ target: { value } }) {
        setInputValue(value)
    }

    return <section className="edit-note">
        <input type="text" placeholder="Enter note..." value={inputValue} onChange={(ev) => onInputText(ev)} />
        <button className="add-note" onClick={() => onAddNote(inputValue)}>Add Note</button>
    </section>
}