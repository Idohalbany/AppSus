export const demoDataService = {
    getDemoNotes
}

function getDemoNotes() {
    const notes = [
        {
            id: 'n101',
            createdAt: 1630950000,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: 1630951000,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://th.bing.com/th/id/OIP.3Lt2bxM5jCYe3_sbORgy8wHaE8?pid=ImgDet&rs=1',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            createdAt: 1630952000,
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        },
        {
            id: 'n104',
            createdAt: 1630953000,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#ff5733'
            },
            info: {
                txt: 'Remember to buy groceries'
            }
        },
        {
            id: 'n105',
            createdAt: 1630954000,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://th.bing.com/th/id/R.bf2e5ffacc43ce0d218f00b7f09a0de4?rik=4PnikgaP5Kc3WQ&pid=ImgRaw&r=0',
                title: 'Nature Walk'
            },
            style: {
                backgroundColor: '#ff5733'
            }
        },
        {
            id: 'n106',
            createdAt: 1630955000,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#33ff57'
            },
            info: {
                txt: 'Meeting with Jane at 3 PM'
            }
        },
        {
            id: 'n107',
            createdAt: 1630956000,
            type: 'NoteTodos',
            isPinned: true,
            info: {
                title: 'Work on project',
                todos: [
                    { txt: 'Research', doneAt: 1630957000 },
                    { txt: 'Write code', doneAt: null }
                ]
            }
        },
        {
            id: 'n108',
            createdAt: 1630957000,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#57ff33'
            },
            info: {
                txt: 'Call Mom'
            }
        },
        {
            id: 'n109',
            createdAt: 1630958000,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://www.travelontv.com/wp-content/uploads/2019/03/wandering-eyes-funny-vacation-photos.jpg',
                title: 'Vacation Memories'
            },
            style: {
                backgroundColor: '#57ff33'
            }
        },
        {
            id: 'n110',
            createdAt: 1630959000,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#3357ff'
            },
            info: {
                txt: 'Pick up dry cleaning'
            }
        },
        {
            id: 'n111',
            createdAt: 1630960000,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#ff5733'
            },
            info: {
                txt: 'Write a blog post'
            }
        },
        {
            id: 'n112',
            createdAt: 1630961000,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://3.bp.blogspot.com/-Hw72u7OG8u4/UAWfT0Vc5lI/AAAAAAAAK74/nr6lsZVbOB0/s1600/Funny+Sunset+Pictures+(15).jpg',
                title: 'Beautiful Sunset'
            },
            style: {
                backgroundColor: '#ff5733'
            }
        },
        {
            id: 'n113',
            createdAt: 1630962000,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#33ff57'
            },
            info: {
                txt: 'Buy tickets for concert'
            }
        },
        {
            id: 'n114',
            createdAt: 1630963000,
            type: 'NoteTodos',
            isPinned: true,
            info: {
                title: 'Home Improvement',
                todos: [
                    { txt: 'Paint the living room', doneAt: 1630964000 },
                    { txt: 'Fix the leaky faucet', doneAt: null }
                ]
            }
        },
        {
            id: 'n115',
            createdAt: 1630964000,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#57ff33'
            },
            info: {
                txt: 'Send birthday gift to Sarah'
            }
        }
    ]

    return notes
}
