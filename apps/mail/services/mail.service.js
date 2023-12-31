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
  removeBySentTime,
  moveToTrash,
  permanentDelete,
  moveToInbox,
}

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

function getDefaultCriteria() {
  return {
    txt: '',
    status: 'inbox',
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
    // console.log(mails)
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

function moveToInbox(mailId) {
  get(mailId)
    .then((mail) => {
      mail.status = 'inbox'
      storageService.put(MAIL_KEY, mail)
      return mail
    })
    .catch((err) => console.error('Could not update mail due to: ', err))
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function permanentDelete(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function removeBySentTime(sentTime) {
  storageService.query(MAIL_KEY).then((mails) => {
    const index = mails.findIndex((email) => email.sentAt === sentTime)
    if (index > -1) {
      mails.splice(index, 1)
    } else {
      console.log('No draft found with sentTime:', sentTime)
    }

    storageService.saveToStorage(MAIL_KEY, mails)
  })
}

function moveToTrash(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    mail.status = 'trash'
    return storageService.put(MAIL_KEY, mail)
  })
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
        'The ship sailed.',
        true,
        Date.now(),
        null,
        'alice.brown@example.com',
        'david.jones@randmail.com',
        ['sent'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Phone bill',
        'Pay the bills now or we will cut you off! dont test us....',
        true,
        1672510386536,
        null,
        'emily.jo@sol.net',
        'Bezeq',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        "Let's go eat something",
        'interested?',
        true,
        1672510287536,
        null,
        'emily.john@mail.net',
        'william@walla.com',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'To mom!',
        'He forgot the umbrella, please bring that when.',
        false,
        1674510187536,
        null,
        'michael@mailer.com',
        'ela.son@mail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Hey!!!',
        'new message from appsus',
        false,
        1622510387536,
        null,
        'user@appsus.com',
        'sophia@inbox.org',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'My dog died',
        'I found an old image.',
        false,
        1551433950594,
        null,
        'mic@mailer.com',
        'nati@gmail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Miss you a lot!',
        'A mysterious letter arrived.',
        false,
        1551133930594,
        null,
        'user@appsus.com',
        'john@mail.com',
        ['sent'],
        false,
        ['important']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'You are better',
        'The sun painted the sky with shades',
        false,
        1551133230894,
        null,
        'sophia.miller@inbox.org',
        'olivia@postbox.com',
        ['draft'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'New dicovery',
        'Nati"s affraid of cats. lame!!',
        false,
        1551133980594,
        null,
        'user@appsus.com',
        'doe@mail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        "Don't mess with me",
        'Just do your job nati!',
        false,
        1551033930094,
        null,
        'william.jack@co.com',
        'olivia@postbox.com',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'API key',
        'Hi! your API key is ready for you!',
        false,
        1521133930594,
        null,
        'olivia.wilson@post.com',
        'Google Cloud',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'yesterday was so boring',
        'The streets were empty, save for the stray cat that watched',
        false,
        1521133930594,
        null,
        'olivia.wilson@post.com',
        'james.taylor@webmail.net',
        ['sent'],
        false,
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
        'william.jackson@cor.com',
        'james.taylor@webmail.net',
        ['sent'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'old clock!',
        'The old clock tower chimed midnight',
        false,
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
        'A mysterious letter',
        true,
        1511933990594,
        null,
        'james.taylor@webmail.net',
        'isabella.son@mail.com',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Gift card',
        'Join to get 10$',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Dropbox',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'New recording',
        'Watch on Youtube now!',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Slack',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        '10 minutes break',
        'Daniel sent a new message',
        true,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Slack',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Hello babe',
        'I hate you I love you I hate that I want you',
        true,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Bar Refaeli',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Iphone 20 is out',
        'Only 999$ on the new Iphone!',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Apple',
        ['inbox'],
        false,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Neew bank is coming',
        'tamid itcha on the ride',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Leumi',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'xdxdxdxdxd',
        'DD moving into her own apt today!',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'dd (Unix)',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'HELLO THERE',
        'Come and teach how to play football',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Football Meneger',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'HOLA',
        'Im a beautiful lady and i dont want to kill.',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Hamas',
        ['inbox'],
        true,
        ['important', 'lovable']
      )
    )
    mails.push(
      getEmptyMail(
        utilService.makeId(),
        'Eazy money Sniper',
        'Durant was born on 1988, in Washington, D.C',
        false,
        1511933990594,
        null,
        'arialevy@gmail.com',
        'Kevin Wayne Durant',
        ['inbox'],
        true,
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
