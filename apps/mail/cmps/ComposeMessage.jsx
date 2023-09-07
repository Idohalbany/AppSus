const { useState } = React
const { Link, useNavigate } = ReactRouterDOM
import { emailService } from '../services/mail.service.js'

export function ComposeMessage({ onClose }) {
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

    onClose()
  }

  return (
    <div className='sendMail'>
      <div className='sendMail-header'>
        <h3>New Message</h3>
        <i onClick={onClose} className='fa-solid fa-xmark sendMail-close'></i>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name='to'
          placeholder='To'
          type='email'
          value={to}
          onChange={handleChange}
          required
        />
        <input
          name='subject'
          placeholder='Subject'
          type='text'
          value={subject}
          onChange={handleChange}
          required
        />
        <textarea
          name='body'
          placeholder='Compose email'
          value={body}
          onChange={handleChange}
          className='sendMail-message'
          required
        />
        <div className='sendMail-options'>
          <button className='sendMail-send' type='submit'>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
