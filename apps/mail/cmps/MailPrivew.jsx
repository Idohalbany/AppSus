import { LongTxt } from '../../../cmps/LongTxt.jsx'
const { Link } = ReactRouterDOM
const { useState } = React

export function MailPrivew({ email, onDeleteEmail, onMarkEmail, onSetIsStarred }) {
  const { id, isRead, isStarred, subject, body, sentAt, removedAt, to, from, status, labels } =
    email
  const [isHovered, setIsHovered] = useState(false)
  const grayBg = isRead ? 'whitesmoke' : 'white'
  const starBg = isStarred ? '#FFD700' : '#e8e8e8f3'

  const getSentDate = (sentAt) => {
    const timeToString = new Date(sentAt)
    return timeToString.toLocaleString().slice(0, 10)
  }

  const handleButtonClick = (event, action) => {
    event.preventDefault()
    event.stopPropagation()

    if (action === 'delete') onDeleteEmail(id)
    if (action === 'mark') onMarkEmail(id)
    if (action === 'star') onSetIsStarred(id)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='email-preview'
      style={{ backgroundColor: grayBg }}>
      {/* Checkbox */}
      <input type='checkbox' className='mail-checkbox' />

      {/* Star icon */}
      <button onClick={(e) => handleButtonClick(e, 'star')} className='star-btn'>
        <i className='fa fa-star' style={{ color: starBg }}></i>
      </button>

      {/* Email sender */}
      <Link to={`/mail/${email.id}`}>
        <div className='email-content' style={{ display: 'flex', alignItems: 'center' }}>
          <span className='email-sender'>{from}</span>

          {/* Subject and Body */}
          <strong>{subject}</strong>
          <span> - </span>
          <LongTxt txt={body} length={100} />
        </div>
      </Link>

      {/* Icons */}
      <div className='icon-actions'>
        {isHovered ? (
          <React.Fragment>
            <button onClick={(e) => handleButtonClick(e, 'delete')} className='trash-btn'>
              <i className='fa fa-trash'></i>
            </button>
            <button onClick={(e) => handleButtonClick(e, 'mark')} className='read-btn'>
              <i className={isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i>
            </button>
          </React.Fragment>
        ) : (
          <span className='email-date'>{getSentDate(sentAt)}</span>
        )}
      </div>
    </div>
  )
}
