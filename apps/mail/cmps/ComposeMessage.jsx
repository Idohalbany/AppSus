const { useState } = React
const { Link, useNavigate } = ReactRouterDOM
import { emailService } from '../services/mail.service.js'

export function ComposeMessage() {
  const [composeDetails, setComposeDetails] = useState({
    to: '',
    subject: '',
    body: '',
    from: 'your-email@mail.com',
    isRead: false,
    isStarred: false,
    status: ['sent'],
    labels: [],
    removedAt: null,
    sentAt: Date.now(),
  })

  const { to, subject, body } = composeDetails
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setComposeDetails({ ...composeDetails, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (to && body && subject) {
      emailService.save(composeDetails)
    }

    navigate('/mail')
  }

  return (
    <div className='compose-container'>
      <Link to='/mail' className='back-link'>
        Back
      </Link>
      <form className='compose-form' onSubmit={handleSubmit}>
        <input
          className='compose-input'
          type='text'
          name='to'
          value={to}
          onChange={handleChange}
          placeholder='To'
          required
        />
        <input
          className='compose-input'
          type='text'
          name='subject'
          value={subject}
          onChange={handleChange}
          placeholder='Subject'
          required
        />
        <textarea
          className='compose-textarea'
          name='body'
          value={body}
          onChange={handleChange}
          placeholder='Compose email'
          required
        />
        <button className='send-button' type='submit'>
          Send
        </button>
      </form>
    </div>
  )
}
