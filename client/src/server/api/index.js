import axios from 'axios'

let url;

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'production') {
    url = 'https://flickr-search-with-dpi.herokuapp.com'
} else {
    url =  `http://localhost:${PORT}`
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