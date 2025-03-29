// imports
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { deleteItem, getOneItemInBox } from "../../services/itemService"
import Breadcrumb from "../Breadcrumb/Breadcrumb"

// component
const ItemDetail = () => {
    // hooks
    const { jobId, boxId, itemId } = useParams()
    const navigate = useNavigate()

    // state
    const [item, setItem] = useState(null)


    // get item
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItem = await getOneItemInBox(jobId, boxId, itemId)
                setItem(fetchedItem)
            } catch (err) {
                console.log(err);
            }
        }
        fetchItem();
    }, [jobId, boxId, itemId]);

    const handleDelete = async () => {
        try {
            await deleteItem(jobId, boxId, itemId)
            navigate(`/jobs/${jobId}/${boxId}`)
        } catch (err) {
            console.log('Error Deleting Item', err);
        };
    };

    if (!item) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center">
                <Breadcrumb />
            </div>
            <div>
                <h1>{item.name}</h1>
            </div>
            <div>
                <Link to={`/jobs/${jobId}/${boxId}/${itemId}/edit-item`}>
                    <button>Edit Item</button>
                </Link>
                <button onClick={handleDelete}>Delete Item</button>
            </div>
        </>
    )
}

export default ItemDetail