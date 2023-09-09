const { useState, useEffect } = React

export function MailSort({ onSortChange }) {
  const [rotate, setRotate] = useState(false)
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'sentAt',
    order: 1,
  })

  const handleChange = (event) => {
    const value = event.target.value
    setSortCriteria({ ...sortCriteria, sortBy: value })
  }

  const handleIconClick = () => {
    setRotate(true)
    setTimeout(() => {
      setRotate(false)
    }, 1000)
  }

  useEffect(() => {
    onSortChange(sortCriteria)
  }, [sortCriteria])

  return (
    <div className='sort-container'>
      <select title='Sort By' name='sortBy' value={sortCriteria.sortBy} onChange={handleChange}>
        <option value='sentAt'>Date</option>
        <option value='subject'>Subject</option>
      </select>
      <button onClick={() => setSortCriteria({ ...sortCriteria, order: sortCriteria.order * -1 })}>
        {sortCriteria.order === 1 ? (
          <i title='Ascending' className='fas fa-arrow-up'></i>
        ) : (
          <i title='Descending' className='fas fa-arrow-down'></i>
        )}
      </button>
      <button onClick={handleIconClick}>
        <i
          title='Refresh List'
          className={`fa-solid fa-arrow-rotate-right ${rotate ? 'rotate-icon' : ''}`}></i>
      </button>
    </div>
  )
}
