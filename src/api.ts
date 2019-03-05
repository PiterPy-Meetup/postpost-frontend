import axios from 'axios';
import { PublicationInterface } from './interfaces';

export const client = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
    timeout: 1000,
});

client.interceptors.request.use(
    (config) => {
      config.headers.authorization = 'Bearer 9Q2DBXAUju3PpL7R18vdXbs6KQ1AJ6';
      return config;
    },
    (error) => Promise.reject(error),
);

export async function fetchPublications(): Promise<PublicationInterface[]> {
    const result = await client.get('/publications');
    const publications = result.data as PublicationInterface[];
    return publications;
}
