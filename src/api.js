import axios from 'axios'

const BASE_URL = 'https://fundoonotes.incubation.bridgelabz.com/api/user'

export const login = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, payload)

        if (response.status === 200) {
            return response?.data
        }else{
            throw new Error(response?.data?.message)
        }
    } catch (err) {
        throw err
    }
}