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