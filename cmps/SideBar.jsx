const { useState, useEffect } = React

export function SideBar({ toggleContentClass, onCategorySelect, toggleComposeModal }) {
  const [activeLink, setActiveLink] = useState(0)
  const [isClosed, setIsClosed] = useState(window.innerWidth < 768)

  const nameToIconMap = {
    Inbox: 'fa-envelope',
    Star: 'fa-star',
    Snoozed: 'fa-clock',
    Sent: 'fa-paper-plane',
    'All Mail': 'fa-box-archive',
    Trash: 'fa-trash',
    Spam: 'fa-circle-exclamation',
    Draft: 'fa-file-circle-question',
  }

  const handleLinkClick = (e, index, categoryName) => {
    e.preventDefault()
    setActiveLink(index)
    onCategorySelect(categoryName)

  }

  const toggleSidebar = (e) => {
    e.preventDefault()
    setIsClosed(!isClosed)
    toggleContentClass()
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsClosed(true)
      } else {
        setIsClosed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={`sidebar ${isClosed ? 'close' : ''}`}>
      <a href='#' className='logo'>
        <i onClick={toggleSidebar} className='bx bx-code-alt'></i>
        <div className='logo-name'>
          <span>App</span>Sus
        </div>
        <i onClick={toggleSidebar} className={`bx bx-menu ${isClosed ? 'hide' : ''}`}></i>
      </a>
      <button className='compose-btn' onClick={toggleComposeModal}>
        <img
          src='https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png'
          alt='Compose Email'
        />
      </button>
      <ul className='side-menu'>
        {Object.keys(nameToIconMap).map((name, index) => (
          <li key={name} className={index === activeLink ? 'active' : ''}>
            <a href='#' onClick={(e) => handleLinkClick(e, index, name)}>
              <i
                style={{ marginRight: 20, marginLeft: 10 }}
                className={`fa-solid ${nameToIconMap[name]}`}></i>
              {name}
            </a>
          </li>
        ))}
      </ul>
      <ul className='side-menu'>
        <li>
          <a href='#' className='logout'>
            <i className='bx bx-log-out-circle'></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  )
}
