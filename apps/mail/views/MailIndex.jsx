const { useState, useEffect } = React
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { emailService } from '../services/mail.service.js'

export function MailIndex() {
  const [emails, setEmails] = useState([])
  const [filter, setFilter] = useState(emailService.getDefaultCriteria())

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    emailService.query(newFilter).then((emails) => {
      setEmails(emails)
      console.log(newFilter)
      console.log(emails)
    })
  }

  useEffect(() => {
    emailService.query(filter).then(setEmails)
  }, [filter])

  const onDeleteEmail = (id) => {
    emailService.remove(id).then(() => {
      const updatedEmails = emails.filter((email) => email.id !== id)
      setEmails(updatedEmails)
    })
  }

  const onMarkEmail = (id) => {
    emailService.toggleRead(id).then(() => {
      setEmails(updatedEmails)
    })
  }

  const onSetIsStarred = (id) => {
    emailService.toggleStar(id).then((updatedEmails) => {
      setEmails(updatedEmails)
    })
  }

  return (
    <div className='email-app'>
      <MailFilter onFilterChange={handleFilterChange} />
      <MailList
        emails={emails}
        onDeleteEmail={onDeleteEmail}
        onMarkEmail={onMarkEmail}
        onSetIsStarred={onSetIsStarred}
      />
    </div>
  )
}
