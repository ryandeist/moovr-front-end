import api from '../services/apiService';

export const logIn = async (formData) => {
    const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/token/`;

    try {
        const res = await api.post(BASE_URL, formData);

        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        console.log("Login successful:", res.data.user);
        return res.data.user;
    } catch (err) {
        console.log("Signup failed:", err);
        throw new Error("Invalid Credentials.");
    }
};

export const signUp = async (formData) => {
    const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/user/signup/`;

    try {
        const res = await api.post(BASE_URL, formData);

        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        console.log("Signup and Log In successful:", res.data.user);
        return res.data.user;
    } catch (err) {
        console.log("Signup failed:", err)
        throw new Error('Sign Up Failed');
    }
}