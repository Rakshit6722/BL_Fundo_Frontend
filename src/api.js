import axios from 'axios'

const USER_BASE_URL = 'https://fundoonotes.incubation.bridgelabz.com/api/user'
const NOTE_BASE_URL = 'https://fundoonotes.incubation.bridgelabz.com/api/notes'

export const login = (payload) => {
    return axios.post(`${USER_BASE_URL}/login`, payload, {
        'Content-Type':"application/json"
    })
}

export const signup = (payload) => {
    return axios.post(`${USER_BASE_URL}/userSignUp`, payload)
}

export const getNotes = () => {
    return axios.get(`${NOTE_BASE_URL}/getNotesList`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const addNote = (payload) => {
    return axios.post(`${NOTE_BASE_URL}/addNotes`, payload, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const archiveNote = (payload) => {
    return axios.post(`${NOTE_BASE_URL}/archiveNotes`, payload, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const trashNote = (payload) => {
    return axios.post(`${NOTE_BASE_URL}/trashNotes`,payload,{
        headers:{
            Authorization: localStorage.getItem("token")
        }
    })
}

export const getArchiveNotes = () => {
    return axios.get(`${NOTE_BASE_URL}/getArchiveNotesList`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}

export const getTrashNotes = () => {
    return axios.get(`${NOTE_BASE_URL}/getTrashNotesList`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}

export const deleteForeverNotes = (payload) => {
    return axios.post(`${NOTE_BASE_URL}/deleteForeverNotes`,payload,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}

export const updateNote = (payload) => {
    console.log("payload",payload)
    return axios.post(`${NOTE_BASE_URL}/updateNotes`,payload,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}


export const changeColor = (payload) => {
    return axios.post(`${NOTE_BASE_URL}/changesColorNotes`,payload,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}

export const logout = (navigate) => {
    localStorage.removeItem('token')
    navigate('/')
}

export const addUpdateReminder = (payload) => {
    return axios.post(`${NOTE_BASE_URL}/addUpdateReminderNotes`,payload,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}

export const getReminderNotes = () => {
    return axios.get(`${NOTE_BASE_URL}/getReminderNotesList`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}