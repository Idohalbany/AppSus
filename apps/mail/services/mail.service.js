import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

_createMails()

export const emailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getNearbyMailIds,
  getUnreadMails,
  getDefaultCriteria,
  sortMail,
  put,
  toggleRead,
  toggleStar,
}

// const loggedinUser = {
//   email: 'user@appsus.com',
//   fullname: 'Mahatma Appsus',
// }

function getDefaultCriteria() {
  return {
    txt: '',
    status: 'All',
    isRead: null,
    isStarred: null,
    labels: [],
  }
}

function query(filterBy = getDefaultCriteria()) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      mails = mails.filter(
        (mail) =>
          regex.test(mail.to) ||
          regex.test(mail.from) ||
          regex.test(mail.body) ||
          regex.test(mail.subject)
      )
    }
    if (filterBy.status && filterBy.status !== 'All') {
      mails = mails.filter((mail) => mail.status.includes(filterBy.status))
    }
    if (filterBy.isRead !== null) {
      mails = mails.filter((mail) => mail.isRead === filterBy.isRead)
    }
    if (filterBy.isStarred !== null) {
      mails = mails.filter((mail) => mail.isStarred === filterBy.isStarred)
    }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function getNearbyMailIds(mailId) {
  return storageService.query(MAIL_KEY).then((mails) => {
    var idx = mails.findIndex((mail) => mail.id === mailId)

    let nextIdx = mails[idx].id
    let prevIdx = mails[idx].id
    if (mails.length <= 1) return { nextMailId: mails[nextIdx].id, prevMailId: mails[prevIdx].id }

    if (idx === mails.length - 1) nextIdx = 0
    else nextIdx = idx + 1
    if (idx === 0) prevIdx = mails.length - 1
    else prevIdx = idx - 1

    return { nextMailId: mails[nextIdx].id, prevMailId: mails[prevIdx].id }
  })
}

function getUnreadMails(criteria, val) {
  const filterBy = {
    [`${criteria}`]: val,
    labels: '',
    isRead: false,
  }
  return query(filterBy)
}

function sortMail(sortBy, change) {
  return query().then((mails) => {
    if (sortBy === 'sentAt') {
      mails.sort((mail1, mail2) => (mail1[sortBy] - mail2[sortBy]) * change)
    }
    if (sortBy === 'subject') {
      mails.sort((mail1, mail2) => {
        const a = mail1[sortBy].toLowerCase()
        const b = mail2[sortBy].toLowerCase()
        return a.localeCompare(b) * change
      })
    }
    return mails
  })
}

function toggleRead(mailId) {
  return get(mailId).then((mail) => {
    mail.isRead = !mail.isRead
    return save(mail)
  })
}

function toggleStar(mailId) {
  return get(mailId).then((mail) => {
    mail.isStarred = !mail.isStarred
    return save(mail)
  })
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    console.log('updating:', mail)
    return storageService.put(MAIL_KEY, mail)
  } else {
    console.log('creating:', mail)
    return storageService.post(MAIL_KEY, mail)
  }
}

function put(mail) {
  return storageService.put(MAIL_KEY, mail)
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY) || []
  if (!mails || !mails.length) {
    mails = []
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Life lesson',
        'As the ship sailed, they waved to their homeland, excited for the adventures ahead.',
        true,
        Date.now(),
        null,
        'alice.brown@example.com',
        'david.jones@randmail.com',
        ['sent'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'therapy',
        'The artist lost himself in his painting, creating a masterpiece.',
        true,
        1672510386536,
        null,
        'emily.johnson@sendmail.net',
        'idohalbany97@gmail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        "Let's go eat something",
        'What to you say? interested on getting some burgers?.',
        true,
        1672510287536,
        null,
        'emily.johnson@sendmail.net',
        'william.jackson@correspondence.com',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'To my mom!',
        'He forgot his umbrella, and it began to rain heavily.',
        false,
        1674510187536,
        null,
        'michael.smith@mailer.com',
        'isabella.anderson@mailing.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Hey!!!',
        'The streets were empty, save for the stray cat that watched from the shadows.',
        false,
        1622510387536,
        null,
        'user@appsus.com',
        'sophia.miller@inbox.org',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'My dog died',
        'I found an old diary tucked away in the attic, filled with forgotten memories.',
        false,
        1551433950594,
        null,
        'michael.smith@mailer.com',
        'natifeldman@gmail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Miss you a lot!',
        'A mysterious letter arrived in the mail, but it was addressed to someone else.',
        false,
        1551133930594,
        null,
        'user@appsus.com',
        'john.doe@myemail.com',
        ['inbox', 'sent'],
        false,
        ['important']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'You are better',
        'The sun painted the sky with shades of pink and orange as it set.',
        false,
        1551133230894,
        null,
        'sophia.miller@inbox.org',
        'olivia.wilson@postbox.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'New dicovery',
        'Nati is affraid of cats. how lame!!!',
        false,
        1551133980594,
        null,
        'user@appsus.com',
        'john.doe@myemail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        "Don't mess with me",
        'Just do your job nati olivia! you have 2 hours or you are fired!.',
        false,
        1551033930094,
        null,
        'william.jackson@correspondence.com',
        'olivia.wilson@postbox.com',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'yesterday was so boring',
        'The streets were empty, save for the stray cat that watched from the shadows.',
        false,
        1521133930594,
        null,
        'olivia.wilson@postbox.com',
        'james.taylor@webmail.net',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Happy birthday',
        'Happy Birthday my dear friend! I love you.',
        true,
        1558133930594,
        null,
        'william.jackson@correspondence.com',
        'james.taylor@webmail.net',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'old clock!',
        'The old clock tower chimed midnight, signaling the start of the festival.',
        true,
        1251133930594,
        null,
        'natifeldman@gmail.com',
        'user@appsus.com',
        ['sent'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'annonymous',
        'A mysterious letter arrived in the mail, but it was addressed to someone else.',
        true,
        1511933990594,
        null,
        'james.taylor@webmail.net',
        'isabella.anderson@mailing.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    storageService.saveToStorage(MAIL_KEY, mails)
  }
}

function getEmptyMail(
  id = '',
  subject = '',
  body = '',
  isRead = false,
  sentAt = '',
  removedAt = '',
  to = '',
  from = '',
  status = '',
  isStarred = false,
  labels = []
) {
  return {
    id,
    subject,
    body,
    isRead,
    sentAt,
    removedAt,
    to,
    from,
    status,
    isStarred,
    labels,
  }
}
