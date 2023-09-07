const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailSort } from '../cmps/MailSort.jsx'
import { emailService } from '../services/mail.service.js'

export function MailIndex() {
  const [emails, setEmails] = useState([])
  const [filter, setFilter] = useState(emailService.getDefaultCriteria())

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    emailService.query(newFilter).then((emails) => {
      setEmails(emails)
    })
  }

  const handleSortChange = (newSortCriteria) => {
    emailService.sortMail(newSortCriteria.sortBy, newSortCriteria.order).then((sortedMails) => {
      setEmails(sortedMails)
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
    emailService
      .toggleRead(id)
      .then((updatedEmail) => {
        const updatedEmails = emails.map((email) => (email.id === id ? updatedEmail : email))
        setEmails(updatedEmails)
      })
      .catch((error) => {
        console.error('Error toggling read status:', error)
      })
  }

  const onSetIsStarred = (id) => {
    emailService
      .toggleStar(id)
      .then((updatedEmail) => {
        const updatedEmails = emails.map((email) => (email.id === id ? updatedEmail : email))
        setEmails(updatedEmails)
      })
      .catch((error) => {
        console.error('Error toggling star status:', error)
      })
  }

  return (
    <div className='email-app'>
      <Link className='compose-btn' to='/compose'>
        <img
          src='https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png'
          alt='Compose Email'
        />
      </Link>
      <MailSort onSortChange={handleSortChange} />
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
