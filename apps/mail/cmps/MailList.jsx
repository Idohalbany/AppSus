import { MailPrivew } from './MailPrivew.jsx'

export function MailList({ emails, onDeleteEmail, onMarkEmail, onSetIsStarred }) {
  return (
    <section className='email-list'>
      {emails.map((email) => (
        <MailPrivew
          email={email}
          key={email.id}
          onDeleteEmail={onDeleteEmail}
          onMarkEmail={onMarkEmail}
          onSetIsStarred={onSetIsStarred}
        />
      ))}
    </section>
  )
}
