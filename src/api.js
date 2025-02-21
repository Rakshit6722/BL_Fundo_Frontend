import axios from 'axios'

const BASE_URL = 'https://fundoonotes.incubation.bridgelabz.com/api/user'

export const login = async (payload) => {

    return axios.post(`${BASE_URL}/login`, payload)



}

export const getNotes = () => {
    return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}