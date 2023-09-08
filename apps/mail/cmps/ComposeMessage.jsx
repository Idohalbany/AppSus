const { useState, useEffect } = React
import { emailService } from '../services/mail.service.js'

export function ComposeMessage({ draft, onClose }) {
  const initialComposeDetails = {
    to: draft ? draft.to : '',
    subject: draft ? draft.subject : '',
    body: draft ? draft.body : '',
    from: 'your-email@mail.com',
    isRead: false,
    isStarred: false,
    status: ['sent'],
    labels: [],
    removedAt: null,
    sentAt: Date.now(),
  }

  const [composeDetails, setComposeDetails] = useState(initialComposeDetails)
  const [draftSentAt, setDraftSentAt] = useState(Date.now())

  const handleChange = (event) => {
    const { name, value } = event.target
    setComposeDetails({ ...composeDetails, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (composeDetails.to && composeDetails.body && composeDetails.subject) {
      emailService.save(composeDetails)
    }
    onClose()
  }

  const handleClose = () => {
    const { to, subject, body } = composeDetails
    if (!to || !body || !subject) {
      createDraft()
    }
    onClose()
  }

  const createDraft = () => {
    const newDraft = {
      ...composeDetails,
      status: ['draft'],
      sentAt: draftSentAt,
    }

    setDraftSentAt(newDraft.sentAt)
    emailService.save(newDraft)
    const timerId = setTimeout(() => {
      // emailService.removeBySentTime(newDraft.sentAt)
    }, 5000)

    return () => clearTimeout(timerId)
  }

  const { to, subject, body } = composeDetails

  return (
    <div className='sendMail'>
      <div className='sendMail-header'>
        <h3>New Message</h3>
        <i onClick={handleClose} className='fa-solid fa-xmark sendMail-close'></i>
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
