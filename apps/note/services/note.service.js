import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { demoDataService } from '../../../services/demoData.service.js'
import { SyncStorageService } from '../../../services/storage.service.js'

const STORAGE_KEY = 'noteDB'

_createDemoNotes()

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

function _createDemoNotes() {
    let notes = SyncStorageService.loadFromStorage(STORAGE_KEY)
    if (!notes || !notes.length) {
        notes = demoDataService.getDemoNotes()
        SyncStorageService.saveToStorage(STORAGE_KEY, notes)
    }
}