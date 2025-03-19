// imports
import { useState, useEffect } from "react";
import { getOneBox } from "../../services/boxService";
import { useParams } from "react-router";

// component
const BoxDetail = () => {
    // hooks
    const { jobId, boxId} = useParams()

    // state
    const [box, setBox] = useState()

    // get box
    useEffect(() => {
        const fetchBox = async () => {
            try {
                const fetchedBox = await getOneBox(jobId, boxId);
                setBox(fetchedBox)
            } catch (err) {
                console.log('Error Fetching Box', err);
            };
        };
        fetchBox();
    }, [boxId, jobId]);

    if (!box) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h1>{box.box_name}</h1>
        </>
    )
};

export default BoxDetail