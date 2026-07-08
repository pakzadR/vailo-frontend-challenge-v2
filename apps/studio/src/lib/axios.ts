import axios from 'axios';

/** Shared client for all data requests; images bypass it (see image-loader). */
export const api = axios.create({ timeout: 15000 });

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const message = axios.isAxiosError(error)
      ? error.response
        ? `Request failed (${error.response.status})`
        : 'Network error'
      : 'Unexpected error';
    return Promise.reject(new Error(message));
  },
);
