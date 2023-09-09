const { useState, useEffect } = React

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
