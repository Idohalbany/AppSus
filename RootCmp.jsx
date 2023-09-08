const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState } = React

import { SideBar } from './cmps/SideBar.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { MenuNav } from './cmps/MenuNav.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailDetails } from './apps/mail/cmps/MailDetails.jsx'
import { ComposeMessage } from './apps/mail/cmps/ComposeMessage.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'

export function App() {
  const [isContentClass, setIsContentClass] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Inbox')
  // console.log(selectedCategory)
  const toggleContentClass = () => {
    setIsContentClass((prevState) => !prevState)
  }

  return (
    <Router>
      <section className={`app ${isContentClass ? 'content' : ''}`}>
        <SideBar onCategorySelect={setSelectedCategory} toggleContentClass={toggleContentClass} />
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/mail' element={<MailIndex selectedCategory={selectedCategory} />} />
          <Route path='/mail/:id' element={<MailDetails />} />
          <Route path='/compose' element={<ComposeMessage />} />
          <Route path='/note' element={<NoteIndex />} />
          <Route path='/note/edit/:id' element={<NoteIndex />} />
        </Routes>
        <MenuNav />
      </section>
    </Router>
  )
}
