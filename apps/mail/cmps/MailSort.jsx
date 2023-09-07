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
    <div>
      <select name='sortBy' value={sortCriteria.sortBy} onChange={handleChange}>
        <option value='sentAt'>Date</option>
        <option value='subject'>Subject</option>
      </select>
      <button onClick={() => setSortCriteria({ ...sortCriteria, order: sortCriteria.order * -1 })}>
        {sortCriteria.order === 1 ? 'Ascending' : 'Descending'}
      </button>
    </div>
  )
}
