import axios from 'axios';

const api = axios.create({
    baseURL: 'https://piunacartaodevacina.000webhostapp.com'
});

export default api;