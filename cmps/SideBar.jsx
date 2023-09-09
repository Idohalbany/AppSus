const { useState } = React
const { useLocation } = ReactRouterDOM

export function SideBar({ toggleContentClass, onCategorySelect, toggleComposeModal }) {
  const [activeLink, setActiveLink] = useState(0)
  const [isClosed, setIsClosed] = useState(window.innerWidth < 768)
  const location = useLocation()

  const mailNameToIconMap = {
    Inbox: 'fa-envelope',
    Star: 'fa-star',
    Sent: 'fa-paper-plane',
    'All Mail': 'fa-box-archive',
    Trash: 'fa-trash',
    Draft: 'fa-file-circle-question',
  }

  const noteNameToIconMap = {
    All: 'fa-box-archive',
    Pinned: 'fa-thumbtack',
    Unpinned: 'fa-circle-xmark',
    Text: 'fa-font',
    Todo: 'fa-list',
    Images: 'fa-image',
  }
  const isNotePage = location.pathname.includes('/note')
  const nameToIconMap = isNotePage ? noteNameToIconMap : mailNameToIconMap

  // console.log(nameToIconMap)

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

  return (
    <div className={`sidebar ${isClosed ? 'close' : ''}`}>
      <a href='#' className='logo'>
        <i onClick={toggleSidebar} className='bx bx-code-alt'></i>
        <div className='logo-name'>
          <span>App</span>Sus
        </div>
        <i onClick={toggleSidebar} className={`bx bx-menu ${isClosed ? 'hide' : ''}`}></i>
      </a>
      {!isNotePage && (
        <button className='compose-btn' onClick={toggleComposeModal}>
          <img
            src='https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png'
            alt='Compose Email'
          />
        </button>
      )}

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
    </div>
  )
}
