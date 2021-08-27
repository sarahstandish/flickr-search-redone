import axios from 'axios'

let url;

if (process.env.NODE_ENV === 'production') {
    url = 'index.html'
} else {
    url = 'http://localhost:8000/api'
}

const api = axios.create({
    baseURL: url
})

export const newCall = info => api.post('/searchCalls', info)
export const getCalls = () => api.get('/searchCalls')

const apis = {
    newCall,
    getCalls
}

export default apis