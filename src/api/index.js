import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const newCall = info => api.post('/searchCalls', info)
export const getCalls = () => api.get('/searchCalls')

const apis = {
    newCall,
    getCalls
}

export default apis