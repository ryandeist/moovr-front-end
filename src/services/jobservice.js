const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}jobs/`;

export const getJobs = async () => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jobs = await res.json();

        return jobs;
    } catch (err) {
        console.log(err);
    }
}