import axios from 'axios';
import { USER_Cookie_KEY } from 'shared/const';
import Cookie from 'js-cookie';

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = Cookie.get(USER_Cookie_KEY) || '';
    }

    return config;
});
