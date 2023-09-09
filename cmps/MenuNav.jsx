const { useState } = React
const { NavLink } = ReactRouterDOM

export function MenuNav() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleNav() {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`nav ${isOpen ? 'open' : ''}`}>
      <div className='item'>
        <NavLink to='/'>
          <i className='bx bx-home-alt'></i>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/mail'>
          <i className='bx bx-envelope'></i>
        </NavLink>
      </div>
      <div className='item'>
        <i className='bx bx-book-bookmark'></i>
      </div>
      <div className='item'>
        <NavLink to='/note'>
          <i className='bx bx-notepad'></i>
        </NavLink>
      </div>
      <div className='item open_nav' onClick={toggleNav}>
        <i className='fa-solid fa-bars'></i>
      </div>
    </div>
  )
}

// <NavLink to='/'>Home</NavLink>
// <NavLink to='/about'>About</NavLink>
// <NavLink to='/mail'>Mail</NavLink>
// <NavLink to='/note'>Note</NavLink>
