const { useState, useEffect } = React
const { NavLink } = ReactRouterDOM

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
          <a href='#' className='profile'>
            <img src='./assets/img/profile.jpg' alt='Mail IMG' />
          </a>
        </div>
      </nav>
    </header>
  )
}
