import api from "./apiService";

export const getItemsInBox = async (jobId, boxId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}/boxes/${boxId}/items/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching boxes:`, err);
    };
};

export const getOneItemInBox = async (jobId, boxId, itemId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}/boxes/${boxId}/items/${itemId}/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching item #${itemId} in box #${boxId}`, err);
    };
};

export const createItem = async (jobId, boxId, formData) => {
    try {
        const res = await api.post(`/api/jobs/${jobId}/boxes/${boxId}/items/create/`, formData);

        return res.data;
    } catch (err) {
        console.log(`Error creating item`, err);
    };
}

export const deleteItem = async (jobId, boxId, itemId) => {
    try {
        const res = await api.delete(`/api/jobs/${jobId}/boxes/${boxId}/items/${itemId}/`);

        return res.data;
    } catch (err) {
        console.log(`Error deleting item #${itemId}`, err);
    };
};

export const editItem = async (jobId, boxId, itemId, formData) => {
    try {
        const res = await api.put(`/api/jobs/${jobId}/boxes/${boxId}/items/${itemId}/`, formData);

        return res.data;
    } catch (err) {
        console.log(`Error updating item #${itemId} in box #${boxId}`, err);
    };
};