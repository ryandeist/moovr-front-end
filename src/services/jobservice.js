import api from '../services/apiService';

export const getJobs = async () => {
    try {
        const res = await api.get(`/api/jobs/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching jobs:`, err);
    };
};

export const getOneJob = async (jobId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching job #${jobId}:`, err);
    };
};