import api from "./apiService";

export const getBoxes = async (jobId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}/boxes/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching boxes:`, err);
    };
};

export const getOneBox = async (jobId, boxId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}/boxes/${boxId}/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching box #${boxId}:`, err);
    };
};

export const createBox = async (jobId, formData) => {
    try {
        const res = await api.post(`/api/jobs/${jobId}/boxes/create/`, formData);

        return res.data;
    } catch (err) {
        console.log(`Error creating box:`, err);
    };
};

export const deleteBox = async (jobId, boxId) => {
    try {
        const res = await api.delete(`/api/jobs/${jobId}/boxes/${boxId}/`);

        return res.data;
    } catch (err) {
        console.log(`Error deleting box #${boxId}.`, err);
    };
};

export const updateBox = async (jobId, boxId, formData) => {
    try {
        const res = await api.put(`/api/jobs/${jobId}/boxes/${boxId}/`, formData);

        return res.data;
    } catch (err) {
        console.log(`Error updating box #${boxId}.`, err);
    };
};