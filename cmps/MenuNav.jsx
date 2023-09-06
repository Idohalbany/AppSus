const { useState } = React

export function MenuNav() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleNav() {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`nav ${isOpen ? 'open' : ''}`}>
      <div className='item'>
        <i className='bx bx-home-alt'></i>
      </div>
      <div className='item'>
        <i className='bx bx-envelope'></i>
      </div>
      <div className='item'>
        <i className='bx bx-book-bookmark'></i>
      </div>
      <div className='item'>
        <i className='bx bx-notepad'></i>
      </div>
      <div className='item open_nav' onClick={toggleNav}>
        <i className='bx bx-menu'></i>
      </div>
    </div>
  )
}
