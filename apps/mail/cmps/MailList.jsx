import { MailPrivew } from './MailPrivew.jsx'

export function MailList({
  emails,
  onDeleteEmail,
  onMarkEmail,
  onSetIsStarred,
  onDraftClick,
  selectedCategory,
  handlePermanentDeletion,
}) {
  return (
    <section className='email-list'>
      {emails.length > 0 ? (
        emails.map((email) => (
          <MailPrivew
            email={email}
            key={email.id}
            onDeleteEmail={onDeleteEmail}
            onMarkEmail={onMarkEmail}
            onSetIsStarred={onSetIsStarred}
            onDraftClick={onDraftClick}
            selectedCategory={selectedCategory}
            handlePermanentDeletion={handlePermanentDeletion}
          />
        ))
      ) : (
        <div className='no-emails'>
          <p className='no-emails-message'>No emails found</p>
        </div>
      )}
    </section>
  )
}
