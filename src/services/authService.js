import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME } from '../constants';
import api from '../services/apiService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/token/`;

export const login = async (formData) => {
    try {
        const res = await api.post(BASE_URL, formData);

        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        console.log("Login successful:", res.data.user);
        return res.data.user;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

