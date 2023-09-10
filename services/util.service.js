export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  formatDate,
  getAmount,
  saveToStorage,
  loadFromStorage,
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
  return num > 9 ? num + '' : '0' + num
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[date.getMonth()]
}

function debounce(func, wait) {
  let timeout

  return function (...args) {
    return new Promise((resolve) => {
      const later = () => {
        clearTimeout(timeout)
        const res = func(...args)
        return resolve(res)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    })
  }
}

function formatDate(timestamp) {
  const currentTime = new Date()
  const inputTime = new Date(timestamp * 1000) // Convert Unix timestamp to JavaScript Date object

  const diffInSeconds = Math.floor((currentTime - inputTime) / 1000)
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24
  const diffInWeeks = diffInDays / 7
  const diffInMonths = diffInDays / 30
  const diffInYears = diffInDays / 365

  let formattedDate = ''

  const optionsForFullYear = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const optionsForMonthAndDay = { year: 'numeric', month: 'long', day: 'numeric' }
  const optionsForDay = { weekday: 'long' }
  const optionsForTime = { hour: '2-digit', minute: '2-digit' }

  if (diffInYears > 1) {
    formattedDate = inputTime.toLocaleDateString('en-US', optionsForFullYear)
  } else if (diffInMonths > 1) {
    formattedDate = inputTime.toLocaleDateString('en-US', optionsForMonthAndDay)
  } else if (diffInWeeks > 1) {
    formattedDate = inputTime.toLocaleDateString('en-US', optionsForMonthAndDay).toLowerCase()
  } else if (diffInDays > 1) {
    formattedDate = inputTime.toLocaleDateString('en-US', optionsForDay)
  } else {
    formattedDate = inputTime.toLocaleTimeString('en-US', optionsForTime)
  }

  return formattedDate
}

function getAmount(amount, currency) {
  switch (currency) {
    case 'USD':
      return `$ ${amount}`
    case 'EUR':
      return `${amount} €`
    case 'ILS':
      return `₪ ${amount}`
    default:
      return `${amount}`
  }
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}
