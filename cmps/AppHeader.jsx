const { useState, useEffect } = React
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    return () => {
      document.body.classList.remove('dark')
    }
  }, [isDark])

  return (
    <header className='content-header'>
      <nav>
        <div className='content-wrapper'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/mail'>Mail</NavLink>
          <NavLink to='/note'>Note</NavLink>
          <input
            type='checkbox'
            id='theme-toggle'
            hidden
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
          />
          <label htmlFor='theme-toggle' className='theme-toggle'></label>
          <a href='#' className='notif'>
            <i className='bx bx-bell'></i>
            <span className='count'>12</span>
          </a>
          <a href='#' className='profile'>
            <img src='images/logo.png' alt='' />
          </a>
        </div>
      </nav>
    </header>
  )
}
