import axios from 'axios';
import { getENV } from '../helpers/getENV';

const { VITE_API_URL } = getENV();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// TODO: configurar interceptores

calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;