const { Link } = ReactRouterDOM

export function Reminders() {
  return (
    <div className='reminders'>
      <div className='header'>
        <i className='bx bx-note'></i>
        <h3>Recent Notes</h3>
        <Link className='go-to' to='/note'>
          <span>Open Notes</span>
          <i className='bx bx-chevrons-right'></i>
        </Link>
      </div>
      <ul className='task-list'>
        <li className='note1 completed'>
          <div className='task-title'>
            <i className='bx bx-check-circle'></i>
            <p>Start Our Meeting</p>
          </div>
          <span className='status'>09-09-2023</span>
        </li>
        <li className='note2 completed'>
          <div className='task-title'>
            <i className='bx bx-check-circle'></i>
            <p>Family Reunion</p>
          </div>
          <span className='status'>08-09-2023</span>
        </li>
        <li className='note3 not-completed'>
          <div className='task-title'>
            <i className='bx bx-x-circle'></i>
            <p>Play Football</p>
          </div>
          <span className='status'>05-09-2023</span>
        </li>
      </ul>
    </div>
  )
}
