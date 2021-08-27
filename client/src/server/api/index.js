import axios from 'axios'

let url;

if (process.env.NODE_ENV === 'production') {
    url = 'https://flickr-search-with-dpi.herokuapp.com'
} else {
    url = 'http://localhost:8000'
}

const api = axios.create({
    baseURL: url
})

export const newCall = info => api.post('/api/searchCalls', info)
export const getCalls = () => api.get('/api/searchCalls')

const apis = {
    newCall,
    getCalls
}

export default apis