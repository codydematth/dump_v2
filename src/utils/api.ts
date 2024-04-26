import axios from 'axios';

export const apiURL = process.env.NEXT_PUBLIC_BASE_URL;
export const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
