export function Headlines() {
  return (
    <div className='header'>
      <div className='left'>
        <h1>WELCOME TO APPSUS</h1>
        <br />
        <h3>Your personal assistant application</h3>
        <br />
        <br />
        <ul className='breadcrumb'>
          <li>
            <a href='#'>Home </a>
          </li>
          <li>/</li>
          <li>
            <a href='#' className='active'>
              Analytics
            </a>
          </li>
        </ul>
      </div>
      <a href='#' className='report'>
        <i className='fa-solid fa-address-card'></i>
        <span>About</span>
      </a>
    </div>
  )
}
