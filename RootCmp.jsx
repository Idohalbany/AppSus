const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { MenuNav } from './cmps/MenuNav.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailDetails } from './apps/mail/cmps/MailDetails.jsx'
import { ComposeMessage } from './apps/mail/cmps/ComposeMessage.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'

export function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/mail' element={<MailIndex />} />
        <Route path='/mail/:id' element={<MailDetails />} />
        <Route path='/compose' element={<ComposeMessage />} />
        <Route path='/note' element={<NoteIndex />} />
        <Route path='/note/edit/:id' element={<NoteIndex />} />
      </Routes>
      <MenuNav />
    </Router>
  )
}
