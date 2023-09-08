const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailSort } from '../cmps/MailSort.jsx'
import { SideBar } from '../../../cmps/SideBar.jsx'
import { ComposeMessage } from '../cmps/ComposeMessage.jsx'
import { emailService } from '../services/mail.service.js'

export function MailIndex() {
  const [emails, setEmails] = useState([])
  const [filter, setFilter] = useState(emailService.getDefaultCriteria())
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [editingDraft, setEditingDraft] = useState(null)
  const [isContentClass, setIsContentClass] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Inbox')
  // console.log(selectedCategory)
  const toggleContentClass = () => {
    setIsContentClass((prevState) => !prevState)
  }

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

  const handleDraftClick = (draft) => {
    setEditingDraft(draft)
    toggleComposeModal()
  }

  useEffect(() => {
    const filterCriteria = emailService.getDefaultCriteria()

    switch (selectedCategory) {
      case 'Inbox':
        filterCriteria.status = 'inbox'
        break
      case 'Star':
        filterCriteria.isStarred = true
        break
      case 'Sent':
        filterCriteria.status = 'sent'
        break
      case 'All Mail':
        filterCriteria.status = 'All'
        break
      case 'Trash':
        filterCriteria.status = 'trash'
        break
      case 'Spam':
        filterCriteria.isSpam = true
        break
      case 'Draft':
        filterCriteria.status = 'draft'
        break
    }

    emailService.query(filterCriteria).then(setEmails)
  }, [selectedCategory])

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

  const toggleComposeModal = () => {
    setIsComposeOpen(!isComposeOpen)
  }

  return (
    <div className='email-app'>
      <SideBar
        onCategorySelect={setSelectedCategory}
        toggleContentClass={toggleContentClass}
        toggleComposeModal={toggleComposeModal}
      />
      <section className={`app-open ${isContentClass ? 'content' : ''}`}>
        <MailSort onSortChange={handleSortChange} />
        <MailFilter onFilterChange={handleFilterChange} />
        <MailList
          emails={emails}
          onDeleteEmail={onDeleteEmail}
          onMarkEmail={onMarkEmail}
          onSetIsStarred={onSetIsStarred}
          onDraftClick={handleDraftClick}
        />
        {isComposeOpen && <ComposeMessage draft={editingDraft} onClose={toggleComposeModal} />}
      </section>
    </div>
  )
}
