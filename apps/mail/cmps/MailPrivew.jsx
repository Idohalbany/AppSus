import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { emailService } from '../services/mail.service.js'
const { Link } = ReactRouterDOM
const { useState } = React

export function MailPrivew({
  email,
  onDeleteEmail,
  onMarkEmail,
  onSetIsStarred,
  onDraftClick,
  selectedCategory,
  handlePermanentDeletion,
}) {
  const { id, isRead, isStarred, subject, body, sentAt, from } = email
  const [isHovered, setIsHovered] = useState(false)
  const grayBg = isRead ? 'var(--grey)' : 'white'
  const starBg = isStarred ? '#FFD700' : '#e8e8e8f3'

  const getSentDate = (sentAt) => {
    const date = new Date(sentAt)
    const day = date.getDate()
    const monthName = date.toLocaleString('en-US', { month: 'long' })

    return `${day} ${monthName}`
  }

  const handleButtonClick = (event, action) => {
    event.preventDefault()
    event.stopPropagation()

    if (action === 'delete') onDeleteEmail(id)
    if (action === 'mark') onMarkEmail(id)
    if (action === 'star') onSetIsStarred(id)
  }

  const handleEmailClick = (event, id) => {
    onMarkEmail(id)
    if (email.status.includes('draft')) {
      onDraftClick(email)
      event.preventDefault()
    }
  }

  const onPermanentDeleteEmail = (id) => {
    emailService.permanentDelete(id).then(() => {
      handlePermanentDeletion(id)
    })
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='email-preview'
      style={{ backgroundColor: grayBg }}>
      <input type='checkbox' className='mail-checkbox' />
      <button onClick={(e) => handleButtonClick(e, 'star')} className='star-btn'>
        <i className='fa fa-star' style={{ color: starBg }}></i>
      </button>
      <Link
        onClick={(e) => handleEmailClick(e, email.id)}
        to={`/mail/${email.id}`}
        className={`email-content ${isRead ? '' : 'unread-email'}`}>
        <span className='email-sender'>{from}</span>
        <div className='email-out-details'>
          <strong className='email-subject'>{subject}</strong>
          <span className='separator'> - </span>
          <span style={{ color: grayBg }} className='email-body'>
            <LongTxt txt={body} length={100} />
          </span>
        </div>
      </Link>
      <div className='icon-actions'>
        {isHovered ? (
          <React.Fragment>
            {selectedCategory === 'Trash' ? (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onPermanentDeleteEmail(id)
                }}
                className='trash-btn'>
                <i className='fa fa-trash'></i>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onDeleteEmail(id)
                }}
                className='trash-btn'>
                <i className='fa fa-trash'></i>
              </button>
            )}
            <button onClick={(e) => handleButtonClick(e, 'mark')} className='read-btn'>
              <i className={isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i>
            </button>
            <button className='note-btn'>
              <i title='Sent to notes' className='fa-solid fa-note-sticky'></i>
            </button>
          </React.Fragment>
        ) : (
          <span className='email-date'>{getSentDate(sentAt)}</span>
        )}
      </div>
    </div>
  )
}
