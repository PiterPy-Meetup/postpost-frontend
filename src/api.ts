import axios from 'axios';
import { AuthResponseInterface, PublicationInterface } from '@/interfaces';

const client = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
    timeout: 1000,
});

export function getPublications() {
    return client.get('/publications');
}

export async function authorizeUser(username: string, password: string): Promise<AuthResponseInterface> {
    const authData = new FormData();
    authData.append('username', username);
    authData.append('password', password);
    authData.append('client_id', process.env.VUE_APP_CLIENT_ID);
    authData.append('client_secret', process.env.VUE_APP_CLIENT_SECRET);
    authData.append('grant_type', 'password');

    const result = await client.post(
        '/oauth/token/',
        authData,
    );
    return result.data as AuthResponseInterface;
}

export async function createNewPublication(newPublication: object): Promise<PublicationInterface> {
    const result = await client.post(
        '/publications',
        newPublication,
    );
    return result.data as PublicationInterface;
}
