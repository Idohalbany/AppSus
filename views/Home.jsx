import { Headlines } from '../apps/site/Headlines.jsx'
import { Insights } from '../apps/site/Insights.jsx'
import { UserInterfaces } from '../apps/site/UserInterfaces.jsx'
import { Reminders } from '../apps/site/Reminders.jsx'

export function Home() {
  return (
    <section className='home-content'>
      <Headlines />
      <Insights />
      <div className='bottom-data'>
        <UserInterfaces />
        <Reminders />
      </div>
    </section>
  )
}
