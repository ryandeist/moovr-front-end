import api from "./apiService";

export const getBoxes = async (jobId) => {
    try {
        const res = await api.get(`/api/jobs/${jobId}/boxes/`);

        return res.data;
    } catch (err) {
        console.log(`Error fetching boxes`, err);
    };
};
