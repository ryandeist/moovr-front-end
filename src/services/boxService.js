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
    console.log(formData)
    try {
        const res = await api.post(`/api/jobs/${jobId}/boxes/create/`, formData);
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log(`Error creating box:`, err);
    };
};