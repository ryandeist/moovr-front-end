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
        const res = await api.get(`/api/jobs/${jobId}/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching job #${jobId}:`, err);
    };
};

export const createJob = async (formData) => {
    try {
        const res = await api.post(`/api/jobs/create/`, formData);

        return res.data;
    } catch (err) {
        console.log(`Error creating job.`, err);
    };
};

export const deleteJob = async (jobId) => {
    try {
        const res = await api.delete(`/api/jobs/${jobId}/`);

        console.log(`Job #${jobId} Deleted Successfully.`);
        return res.data;
    } catch (err) {
        console.log(`Error deleting job #${jobId}`, err);
    };
};