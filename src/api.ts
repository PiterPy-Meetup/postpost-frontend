import axios from 'axios';
import qs from 'qs';
import { AuthorizeUserInterface, AuthDataInterface, AuthResponseInterface } from '@/interfaces';

const client = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
    timeout: 1000,
});

export function getPublications() {
    return client.get('/publications');
}

export async function authorizeUser(userCredentials: AuthorizeUserInterface): Promise<AuthResponseInterface> {
    const authData: AuthDataInterface = {
        username: userCredentials.username,
        password: userCredentials.password,
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        grant_type: process.env.VUE_APP_GRANT_TYPE,
    };
    const result = await client.post(
        '/oauth/token/',
        qs.stringify(authData),
    );
    const authResponse = result.data as AuthResponseInterface;
    return authResponse;
}
