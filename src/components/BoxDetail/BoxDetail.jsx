// imports
import { useState, useEffect } from "react";
import { deleteBox, getOneBox } from "../../services/boxService";
import { useParams, useNavigate, Link } from "react-router";
import { getItemsInBox } from "../../services/itemService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// component
const BoxDetail = () => {
    // hooks
    const { jobId, boxId } = useParams();
    const navigate = useNavigate();

    // state
    const [box, setBox] = useState();
    const [items, setItems] = useState([]);

    // get box
    useEffect(() => {
        const fetchBox = async () => {
            try {
                const fetchedBox = await getOneBox(jobId, boxId);
                setBox(fetchedBox);
                const itemsInBox = await getItemsInBox(jobId, boxId);
                setItems(itemsInBox)
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
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center">
                <Breadcrumb />
            </div>
            <div>
                <h1>{box.box_name}</h1>
            </div>
            {items.length === 0 ? <div>This box is empty.</div> :
                items.map((item) => (
                    <div key={item.id}>
                        <div>
                            <h2>{item.name}</h2>
                        </div>
                        <div>
                            <Link to={`/jobs/${jobId}/${boxId}/${item.id}`}>Item Details</Link>
                        </div>
                    </div>
                ))
            }
            <div>
                <Link to={`/jobs/${jobId}/${boxId}/edit-box`}>
                    <button>Edit Box</button>
                </Link>
                <button onClick={handleDeleteBox}>Delete Box</button>
            </div>
            <div>
                <Link to={`/jobs/${jobId}/${boxId}/add-item`}>
                    <button>Add Item</button>
                </Link>
            </div>
        </>
    )
};

// export
export default BoxDetail