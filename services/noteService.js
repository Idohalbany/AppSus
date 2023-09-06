import { utilService } from "./util.service.js"
import { storageService } from "./storage.service.js"

const STORAGE_KEY = 'noteDB'

export const noteService = {
    query,
    get,
    remove,
    save,
    // getDefaultFilter,
    // getEmptyNote,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(notes => {
            // if (filterBy.title) {
            //     const regExp = new RegExp(filterBy.title, 'i')
            //     notes = notes.filter(note => regExp.test(note.title))
            // }
            // if (filterBy.price) {
            //     notes = notes.filter(note => note.listPrice.amount >= filterBy.price)
            // }
            return notes
        })
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId).then(_setNextPrevNoteId).catch(err => err + ',Note Not found')
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}



// function getDefaultFilter() {
//     return { title: '', price: '' }
// }

// function getEmptyBook() {
//     return {
//         id: '',
//         title: '',
//         subtitle: '',
//         authors: null,
//         publishedDate: 0,
//         description: '',
//         categories: null,
//         language: '',
//         thumbnail: '',
//         listPrice: {
//             amount: 0,
//             currencyCode: '',
//             isOnSale: false
//         }
//     }

// }
