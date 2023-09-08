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
    <form className='mail-filter' onSubmit={handleSubmit}>
      <div>
        <button type='submit'>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
        <input
          type='text'
          name='txt'
          value={localFilter.txt}
          onChange={handleChange}
          placeholder='Search...'
        />
      </div>
      <div>
        <select name='status' value={localFilter.status} onChange={handleChange}>
          <option value='All'>All</option>
          <option value='inbox'>Inbox</option>
          <option value='sent'>Sent</option>
          <option value='draft'>Draft</option>
          <option value='archived'>Archived</option>
          <option value='trash'>Trash</option>
          <option value='spam'>Spam</option>
        </select>
        <label className='icon-label'>
          <input
            type='checkbox'
            name='isRead'
            checked={localFilter.isRead || false}
            onChange={handleChange}
            style={{ display: 'none' }} 
          />
          <i
            className={localFilter.isRead ? 'fas fa-envelope-open-text' : 'fas fa-envelope'}
            style={{ color: localFilter.isRead ? '#357abf' : '#333' }}></i>
        </label>

        <label className='icon-label'>
          <input
            type='checkbox'
            name='isStarred'
            checked={localFilter.isStarred || false}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <i
            className={localFilter.isStarred ? 'fas fa-star' : 'far fa-star'}
            style={{ color: localFilter.isStarred ? '#357abf' : '#333' }}></i>
        </label>
      </div>
    </form>
  )
}
