// import { LongText } from '../../../cmps/LongTxt.jsx'

export function MailPrivew({ email, onDeleteEmail, onMarkEmail, onSetIsStarred }) {
  const { id, from, subject, body, isRead, isStar, sentAt } = email
  const grayBg = isRead ? 'whitesmoke' : 'white'
  const starBg = isStar ? '#FFD700' : '#e8e8e8f3'

  const getSentDate = (sentAt) => {
    const timeToString = new Date(sentAt)
    return timeToString.toLocaleString().slice(0, 10)
  }

  return (
    <section className='email-preview' style={{ backgroundColor: grayBg }}>
      {/* ... other content ... */}
      <button onClick={() => onSetIsStarred(id)}>
        <i className='fa fa-star' style={{ color: starBg }}></i>
      </button>
      <button onClick={() => onDeleteEmail(id)}>
        <i className='fa fa-trash'></i>
      </button>
      <button onClick={() => onMarkEmail(id)}>
        <i className={isRead ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i>
      </button>
      {/* ... other content ... */}
    </section>
  )
}
