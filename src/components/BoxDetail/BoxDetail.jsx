// imports
import { useState, useEffect } from "react";
import { deleteBox, getOneBox } from "../../services/boxService";
import { useParams, useNavigate, Link } from "react-router";

// component
const BoxDetail = () => {
    // hooks
    const { jobId, boxId} = useParams();
    const navigate = useNavigate();

    // state
    const [box, setBox] = useState();

    // get box
    useEffect(() => {
        const fetchBox = async () => {
            try {
                const fetchedBox = await getOneBox(jobId, boxId);
                setBox(fetchedBox);
            } catch (err) {
                console.log('Error Fetching Box', err);
            };
        };
        fetchBox();
    }, [boxId, jobId]);

    // handler functions
    const handleDeleteBox = async () => {
        try {
            deleteBox(jobId, boxId);
            navigate(`/jobs/${jobId}`);
        } catch (err) {
            console.log(`Error Deleting Box.`, err);
        };
    };

    if (!box) {
        return <h1>Loading...</h1>
    }

    // return
    return (
        <>
            <div>
                <h1>{box.box_name}</h1>
            </div>
            <div>
                <Link to={`/jobs/${jobId}/${boxId}/edit-box`}>
                    <button>Edit Box</button>
                </Link>
                <button onClick={handleDeleteBox}>Delete Box</button>
            </div>
        </>
    )
};

// export
export default BoxDetail