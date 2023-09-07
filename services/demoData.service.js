export const demoDataService = {
    getDemoNotes
}

function getDemoNotes() {
    const notes = [
        {
            id: "n101",
            createdAt: 1630950000,
            type: "NoteTxt",
            isPinned: true,
            style: {
                backgroundColor: "clr1"
            },
            info: {
                title: "My Fullstack Journey",
                txt: "I'm on a journey to become a fullstack developer, and it's an exciting adventure!"
            }
        },
        {
            id: "n102",
            createdAt: 1630951000,
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://th.bing.com/th/id/OIP.3Lt2bxM5jCYe3_sbORgy8wHaE8?pid=ImgDet&rs=1",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "clr2"
            }
        },
        {
            id: "n103",
            createdAt: 1630952000,
            type: "NoteTodos",
            isPinned: false,
            info: {
                title: "Get my life together",
                todos: [
                    { txt: "Get my driving license", doneAt: null },
                    { txt: "Boost my coding skills", doneAt: 187111111 }
                ]
            }
        },
        {
            id: "n104",
            createdAt: 1630953000,
            type: "NoteTxt",
            isPinned: true,
            style: {
                backgroundColor: "clr3"
            },
            info: {
                title: "Grocery Shopping Reminder",
                txt: "Don't forget to buy groceries on the way back home!"
            }
        },
        {
            id: "n105",
            createdAt: 1630954000,
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://th.bing.com/th/id/R.bf2e5ffacc43ce0d218f00b7f09a0de4?rik=4PnikgaP5Kc3WQ&pid=ImgRaw&r=0",
                title: "Nature Walk"
            },
            style: {
                backgroundColor: "clr1"
            }
        },
        {
            id: "n106",
            createdAt: 1630955000,
            type: "NoteTxt",
            isPinned: false,
            style: {
                backgroundColor: "clr2"
            },
            info: {
                title: "Meeting with Jane",
                txt: "I have a meeting scheduled with Jane at 3 PM today."
            }
        },
        {
            id: "n107",
            createdAt: 1630956000,
            type: "NoteTodos",
            isPinned: true,
            info: {
                title: "Work on project",
                todos: [
                    { txt: "Research for the project", doneAt: 1630957000 },
                    { txt: "Start writing code", doneAt: null }
                ]
            }
        },
        {
            id: "n108",
            createdAt: 1630957000,
            type: "NoteTxt",
            isPinned: false,
            style: {
                backgroundColor: "clr3"
            },
            info: {
                title: "Call Mom",
                txt: "I should give Mom a call later today."
            }
        },
        {
            id: "n109",
            createdAt: 1630958000,
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://www.travelontv.com/wp-content/uploads/2019/03/wandering-eyes-funny-vacation-photos.jpg",
                title: "Vacation Memories"
            },
            style: {
                backgroundColor: "clr1"
            }
        },
        {
            id: "n110",
            createdAt: 1630959000,
            type: "NoteTxt",
            isPinned: false,
            style: {
                backgroundColor: "clr2"
            },
            info: {
                title: "Errand for Today",
                txt: "I need to pick up my dry cleaning later."
            }
        },
        {
            id: "n111",
            createdAt: 1630960000,
            type: "NoteTxt",
            isPinned: true,
            style: {
                backgroundColor: "clr3"
            },
            info: {
                title: "Writing Goals",
                txt: "I plan to write a new blog post today, let's get creative!"
            }
        },
        {
            id: "n112",
            createdAt: 1630961000,
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://3.bp.blogspot.com/-Hw72u7OG8u4/UAWfT0Vc5lI/AAAAAAAAK74/nr6lsZVbOB0/s1600/Funny+Sunset+Pictures+(15).jpg",
                title: "Beautiful Sunset"
            },
            style: {
                backgroundColor: "clr1"
            }
        },
        {
            id: "n113",
            createdAt: 1630962000,
            type: "NoteTxt",
            isPinned: false,
            style: {
                backgroundColor: "clr2"
            },
            info: {
                title: "Concert Plans",
                txt: "I need to buy tickets for the upcoming concert."
            }
        },
        {
            id: "n114",
            createdAt: 1630963000,
            type: "NoteTodos",
            isPinned: true,
            info: {
                title: "Home Improvement Projects",
                todos: [
                    { txt: "Paint the living room", "doneAt": 1630964000 },
                    { txt: "Fix the leaky faucet", "doneAt": null }
                ]
            }
        },
        {
            id: "n115",
            createdAt: 1630964000,
            type: "NoteTxt",
            isPinned: false,
            style: {
                backgroundColor: "clr3"
            },
            info: {
                title: "Gift Reminder",
                txt: "I should send a birthday gift to my friend Sarah."
            }
        }
    ]


    return notes
}
