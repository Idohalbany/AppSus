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
import { UserMsg } from './cmps/UserMsg.jsx'
import { BookIndex } from './apps/book/views/book-index.jsx'
import { BookEdit } from './apps/book/views/book-edit.jsx'
import { BookDetails } from './apps/book/views/book-details.jsx'

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
        <Route element={<BookIndex />} path='/book' />
        <Route element={<BookEdit />} path='/book/edit' />
        <Route element={<BookEdit />} path='/book/edit/:bookId' />
        <Route element={<BookDetails />} path='/book/:bookId' />
      </Routes>
      <MenuNav />
      <UserMsg />
    </Router>
  )
}
