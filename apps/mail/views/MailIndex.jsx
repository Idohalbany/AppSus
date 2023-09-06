const { useState, useEffect } = React
import { MailList } from '../cmps/MailList.jsx'
import { emailService } from '../services/mail.service.js'

export function MailIndex() {
  const [emails, setEmails] = useState([])

  useEffect(() => {
    emailService.query().then(setEmails)
  }, [])

  const onDeleteEmail = (id) => {
    emailService.remove(id).then(() => {
      const updatedEmails = emails.filter((email) => email.id !== id)
      setEmails(updatedEmails)
    })
  }

  const onMarkEmail = (id) => {
    emailService.toggleRead(id).then(() => {
      const updatedEmails = emails.map((email) => {
        if (email.id === id) email.isRead = !email.isRead
        return email
      })
      setEmails(updatedEmails)
    })
  }

  const onSetIsStarred = (id) => {
    emailService.toggleStar(id).then(() => {
      const updatedEmails = emails.map((email) => {
        if (email.id === id) email.isStar = !email.isStar
        return email
      })
      setEmails(updatedEmails)
    })
  }

  return (
    <div className='email-app'>
      <MailList
        emails={emails}
        onDeleteEmail={onDeleteEmail}
        onMarkEmail={onMarkEmail}
        onSetIsStarred={onSetIsStarred}
      />
    </div>
  )
}
