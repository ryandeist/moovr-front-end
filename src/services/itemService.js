import api from "./apiService";

export const getItemsInBox = async (jobId, boxId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}/boxes/${boxId}/items/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching boxes:`, err);
    };
};
