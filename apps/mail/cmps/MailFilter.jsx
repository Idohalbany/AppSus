const { useState } = React
import { emailService } from '../services/mail.service.js'

export function MailFilter({ onFilterChange }) {
  const [localFilter, setLocalFilter] = useState(emailService.getDefaultCriteria())

  const handleChange = (event) => {
    const { name } = event.target
    const updatedValue =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value

    const newLocalFilter = { ...localFilter, [name]: updatedValue ? updatedValue : null }
    setLocalFilter(newLocalFilter)
    onFilterChange(newLocalFilter)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFilterChange(localFilter)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='txt' value={localFilter.txt} onChange={handleChange} placeholder='Search...' />
      <select name='status' value={localFilter.status} onChange={handleChange}>
        <option value='All'>All</option>
        <option value='inbox'>Inbox</option>
        <option value='sent'>Sent</option>
        <option value='draft'>Draft</option>
        <option value='archived'>Archived</option>
        <option value='trash'>Trash</option>
        <option value='spam'>Spam</option>
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
