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
    getEmptyNote
}

function query(filterBy = { key: '', type: '' }) {
    return storageService.query(STORAGE_KEY)
        .then(notes => {
            if (filterBy.type) {
                if (filterBy.type === 'pinned') notes = notes.filter(note => note.isPinned)
                else if (filterBy.type === 'unpinned') notes = notes.filter(note => !note.isPinned)
                else notes = notes.filter(note => note.type === filterBy.type)
            }
            if (filterBy.key) {
                const regExp = new RegExp(filterBy.key, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
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

function getEmptyNote(type = 'NoteTxt') {

    let note

    switch (type) {
        case 'NoteTxt':
            note = {
                id: '',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    title: '',
                    txt: ''
                }
            }
            break
        case 'NoteImg':
            note = {
                id: '',
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://th.bing.com/th/id/OIP.XXWKhZZeWjrUPx-ZSfP0GAHaDt?pid=ImgDet&rs=1',
                    title: ''
                }
            }
            break
        case 'NoteTodos':
            note = {
                id: '',
                createdAt: Date.now(),
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: '',
                    todos: [{ txt: '', doneAt: null }]
                }
            }
            break
    }
    return note
}