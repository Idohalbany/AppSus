import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function MailPrivew({ email, onDeleteEmail, onMarkEmail, onSetIsStarred }) {
  const { id, isRead, isStar, subject, body, sentAt, removedAt, to, from, status, labels } = email

  const grayBg = isRead ? 'whitesmoke' : 'white'
  const starBg = isStar ? '#FFD700' : '#e8e8e8f3'

  const getSentDate = (sentAt) => {
    const timeToString = new Date(sentAt)
    return timeToString.toLocaleString().slice(0, 10)
  }

  return (
    <div className='email-preview' style={{ backgroundColor: grayBg }}>
      {/* Checkbox */}
      <input type='checkbox' className='mail-checkbox' />

      {/* Star icon */}
      <button onClick={() => onSetIsStarred(id)} className='star-btn'>
        <i className='fa fa-star' style={{ color: starBg }}></i>
      </button>

      {/* Email sender */}
      <span className='email-sender'>{from}</span>

      {/* Subject and Body */}
      <span className='email-content'>
        <LongTxt txt={`${subject} - ${body}`} length={80} />
      </span>

      {/* Date */}
      <span className='email-date'>{getSentDate(sentAt)}</span>

      {/* Icons */}
      <div className='icon-actions'>
        <button onClick={() => onDeleteEmail(id)} className='trash-btn'>
          <i className='fa fa-trash'></i>
        </button>
        <button onClick={() => onMarkEmail(id)} className='read-btn'>
          <i className={isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i>
        </button>
        {/* Labeling option icon goes here if needed */}
      </div>
    </div>
  )
}

//    <section className='email-preview' style={{ backgroundColor: grayBg }}>
//   <h3>{subject}</h3>
//   <p>From: {from}</p>
//   <p>To: {to}</p>
//   <p>{body}</p>
//   <p>Sent: {getSentDate(sentAt)}</p>
//   {removedAt && <p>Removed: {getSentDate(removedAt)}</p>}
//   <p>Status: {status}</p>
//   <p>Labels: {labels.join(', ')}</p>

//   {/* Action buttons */}
//   <button onClick={() => onSetIsStarred(id)}>
//     <i className='fa fa-star' style={{ color: starBg }}></i>
//   </button>
//   <button onClick={() => onDeleteEmail(id)}>
//     <i className='fa fa-trash'></i>
//   </button>
//   <button onClick={() => onMarkEmail(id)}>
//     <i className={isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i>
//   </button>
// </section>
