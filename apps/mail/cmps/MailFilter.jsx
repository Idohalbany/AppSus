const { useState } = React
import { emailService } from '../services/mail.service.js'

export function MailFilter({ onFilterChange }) {
  const [localFilter, setLocalFilter] = useState(emailService.getDefaultCriteria())

  const handleChange = (event) => {
    const { name, value } = event.target
    const updatedValue = event.target.type === 'checkbox' ? event.target.checked : value
    const newLocalFilter = { ...localFilter, [name]: updatedValue }
    setLocalFilter(newLocalFilter)
    onFilterChange(newLocalFilter)
    console.log(newLocalFilter)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFilterChange(localFilter)
  }

  //   console.log(localFilter.status)
  return (
    <form onSubmit={handleSubmit}>
      <input name='txt' value={localFilter.txt} onChange={handleChange} placeholder='Search...' />
      <select name='status' value={localFilter.status} onChange={handleChange}>
        <option value='All'>All</option>
        <option value='Inbox'>Inbox</option>
        <option value='sent'>Sent</option>
        <option value='Draft'>Draft</option>
        <option value='Archived'>Archived</option>
        <option value='Trash'>Trash</option>
        <option value='Spam'>Spam</option>
      </select>
      <label>
        <input
          type='checkbox'
          name='isRead'
          checked={localFilter.isRead || false}
          onChange={handleChange}
        />
        Read
      </label>
      <label>
        <input
          type='checkbox'
          name='isStarred'
          checked={localFilter.isStarred || false}
          onChange={handleChange}
        />
        Starred
      </label>
      <button type='submit'>Apply Filters</button>
    </form>
  )
}
