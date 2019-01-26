import axios from 'axios';

const client = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
    timeout: 1000,
});

function getPublications() {
    return client.get('/publications');
}
