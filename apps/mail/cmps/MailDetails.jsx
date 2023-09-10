import { emailService } from '../services/mail.service.js'
const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailDetails() {
  const { id } = useParams()
  const [mail, setMail] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    emailService.get(id).then(setMail)
  }, [id])

  const onDeleteEmail = (event, mail) => {
    event.stopPropagation()

    emailService.remove(mail.id).then(() => {
      navigate('/mail')
    })
    showSuccessMsg('Success')
  }

  const onMarkEmail = (event, mail) => {
    event.stopPropagation()

    emailService
      .toggleRead(mail.id)
      .then((updatedEmail) => {
        setMail(updatedEmail)
      })
      .catch((error) => {
        console.error('Error toggling read status:', error)
      })
      showSuccessMsg('Success')
  }

  const onSetIsStarred = (event, mail) => {
    event.stopPropagation()

    emailService
      .toggleStar(mail.id)
      .then((updatedEmail) => {
        setMail(updatedEmail)
      })
      .catch((error) => {
        console.error('Error toggling star status:', error)
      })
      showSuccessMsg('Success')
  }

  const handleMoveToInbox = () => {
    emailService.moveToInbox(mail.id)
    // console.log(mail.id)
    showSuccessMsg('Success')
  }

  const onSetTimeSince = (timestamp) => {
    const now = new Date()
    const then = new Date(timestamp)
    const seconds = Math.floor((now - then) / 1000)

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ]

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i]
      const count = Math.floor(seconds / interval.seconds)
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
      }
    }
    return 'just now'
  }

  if (!mail) return <div>Loading...</div>
  return (
    <div className='mail-page'>
      <div className='mail-tools'>
        <div className='mail-tools-left'>
          <button onClick={() => navigate(-1)} className='icon-button'>
            <i title='Back' className='fa fa-arrow-left'></i>
          </button>
          <button onClick={handleMoveToInbox} className='icon-button'>
            <i title='Inbox' className='fa fa-inbox'></i>
          </button>
          <button onClick={(ev) => onDeleteEmail(ev, mail)} className='icon-button'>
            <i title='Delete' className='fa fa-trash'></i>
          </button>
          <button onClick={(ev) => onMarkEmail(ev, mail)} className='icon-button'>
            <i
              title={mail.isRead ? 'Mark as unread' : 'Mark as read'}
              className={`fa ${mail.isRead ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
          </button>
          <button onClick={(ev) => onSetIsStarred(ev, mail)} className='icon-button hide'>
            <i
              title={mail.isStarred ? 'Unstar Email' : 'Star Email'}
              className={`fa ${mail.isStarred ? 'fa-star' : 'fa-star-o'}`}></i>
          </button>
        </div>
        <div className='mail-tools-right'>
          <button className='icon-button'>
            <i onClick={() => window.print()} title='Print Mail' className='fa fa-print'></i>
          </button>
          <button className='note-btn'>
            <i title='Sent to notes' className='fa-solid fa-note-sticky'></i>
          </button>
        </div>
      </div>
      <div className='mail-body'>
        <div className='mail-body-header'>
          <h2>{mail.subject}</h2>
          <i className={`fa ${mail.isStarred ? 'fa-star' : 'fa-star-o'} mail-important`}></i>
          <p>{mail.from}</p>
          <p className='mail-time'>{onSetTimeSince(mail.sentAt)}</p>
        </div>
        <div className='mail-message'>
          <p>{mail.body}</p>
        </div>
      </div>
    </div>
  )
}
