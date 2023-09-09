const { Link } = ReactRouterDOM

export function UserInterfaces() {
  return (
    <div className='orders'>
      <div className='header'>
        <i className='bx bxl-gmail'></i>
        <h3>Recent Mails</h3>
        <Link className='go-to' to='/mail'>
          <span>Open Email</span>
          <i className='bx bx-chevrons-right'></i>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src='./assets/img/slack.png' alt='User Profile' />
              <p>Slack</p>
            </td>
            <td>New message</td>
            <td>
              <span className='status'>09-09-2023</span>
            </td>
          </tr>
          <tr>
            <td>
              <img src='./assets/img/dudi.jpeg' alt='User Profile' />
              <p>Dudi Amsalem</p>
            </td>
            <td>My dear brother</td>
            <td>
              <span className='status'>08-09-2023</span>
            </td>
          </tr>
          <tr>
            <td>
              <img src='./assets/img/dropbox.png' alt='User Profile' />
              <p>DropBox</p>
            </td>
            <td>Vicky uploaded! </td>
            <td>
              <span className='status'>08-09-2023</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
