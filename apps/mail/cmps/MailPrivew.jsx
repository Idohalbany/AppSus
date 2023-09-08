import { LongTxt } from '../../../cmps/LongTxt.jsx'
const { Link } = ReactRouterDOM
const { useState } = React

export function MailPrivew({ email, onDeleteEmail, onMarkEmail, onSetIsStarred, onDraftClick }) {
  const { id, isRead, isStarred, subject, body, sentAt, removedAt, to, from, status, labels } =
    email
  const [isHovered, setIsHovered] = useState(false)
  const grayBg = isRead ? 'whitesmoke' : 'white'
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
          <span className='email-body'>
            <LongTxt txt={body} length={100} />
          </span>
        </div>
      </Link>
      <div className='icon-actions'>
        {isHovered ? (
          <React.Fragment>
            <button onClick={(e) => handleButtonClick(e, 'delete')} className='trash-btn'>
              <i className='fa fa-trash'></i>
            </button>
            <button onClick={(e) => handleButtonClick(e, 'mark')} className='read-btn'>
              <i className={isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i>
            </button>
            <button className='clock-btn'>
              <i title='Read later' className='fa fa-clock-o'></i>
            </button>
          </React.Fragment>
        ) : (
          <span className='email-date'>{getSentDate(sentAt)}</span>
        )}
      </div>
    </div>
  )
}
