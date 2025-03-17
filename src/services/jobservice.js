import api from '../services/apiService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/jobs/`;

export const getJobs = async () => {
    try {
        const token = localStorage.getItem('access');
        const res = await api.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data
    } catch (err) {
        console.log(`Error fetching jobs:`, err)
    }
}