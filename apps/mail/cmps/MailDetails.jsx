import { emailService } from '../services/mail.service.js'
const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {
  const { id } = useParams()
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    emailService.get(id).then(setEmail)
  }, [id])

  if (!email) return <div>Loading...</div>

  const onDeleteEmail = () => {
    emailService.remove(email.id).then(() => {
      navigate('/mail')
    })
  }

  return (
    <div className='email-details'>
      <h2>{email.subject}</h2>
      <p>From: {email.from}</p>
      <p>To: {email.to}</p>
      <p>{email.body}</p>
      <button onClick={onDeleteEmail}>Delete</button>
      <button onClick={() => navigate('/mail')}>Back to list</button>
    </div>
  )
}
