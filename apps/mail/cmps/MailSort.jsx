const { useState, useEffect } = React

export function MailSort({ onSortChange }) {
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'sentAt',
    order: 1,
  })

  const handleChange = (event) => {
    const value = event.target.value
    setSortCriteria({ ...sortCriteria, sortBy: value })
  }

  useEffect(() => {
    onSortChange(sortCriteria)
  }, [sortCriteria])

  return (
    <div className='sort-container'>
      <select name='sortBy' value={sortCriteria.sortBy} onChange={handleChange}>
        <option value='sentAt'>Date</option>
        <option value='subject'>Subject</option>
      </select>
      <button onClick={() => setSortCriteria({ ...sortCriteria, order: sortCriteria.order * -1 })}>
        {sortCriteria.order === 1 ? (
          <i className='fas fa-arrow-up'></i>
        ) : (
          <i className='fas fa-arrow-down'></i>
        )}
      </button>
      <button>
        <i className='fa-solid fa-arrow-rotate-right'></i>
      </button>
    </div>
  )
}
