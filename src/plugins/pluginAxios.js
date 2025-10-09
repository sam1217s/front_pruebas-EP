import axios from 'axios';

const token = JSON.parse(localStorage.getItem('auth'))  || '';

export const apiClient = axios.create({
    baseURL: 'https://repfora-ep-backend.onrender.com/api',
    headers: {
        "x-token": token.token
    }
});