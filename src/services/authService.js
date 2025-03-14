const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}token/`;

export const login = async (formData) => {
    try {
        const res = await fetch({BASE_URL}, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Login failed');

        const data = await res.json();
        localStorage.setItem('token', data.access);
        console.log('Login Successful')
        return JSON.parse(atob(data.token.split('.')[1])).payload
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

