import axios from 'axios';

// Create a function to get the current token
function getToken() {
    return localStorage.getItem("token");
}

export const axiosInstance = axios.create({
    baseURL: 'https://online-market-place-backend.onrender.com',
    headers: {
        authorization: `Bearer ${getToken()}`
    }
});

// Update the headers before each request
axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${getToken()}`;
    return config;
});

