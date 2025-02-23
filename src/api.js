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