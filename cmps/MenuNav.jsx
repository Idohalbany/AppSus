const { useState } = React
const { NavLink } = ReactRouterDOM

export function MenuNav() {
  const [isOpen, setIsOpen] = useState(false)
  function toggleNav() {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`nav ${isOpen ? 'open' : ''}`}>
      <div className='item' onClick={toggleNav}>
        <NavLink to='/'>
          <i className='bx bx-home-alt'></i>
        </NavLink>
      </div>
      <div className='item' onClick={toggleNav}>
        <NavLink to='/mail'>
          <i className='bx bx-envelope'></i>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/book'>
          <i className='fa-solid fa-book'></i>
        </NavLink>
      </div>
      <div className='item' onClick={toggleNav}>
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
