const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const getLanding = async () => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const landing = await res.json();

        return landing;
    } catch (err) {
        console.log(err);
    }
}