// imports
import {useState, useEffect} from "react"
import { useParams, Link } from "react-router"
import { getOneItemInBox } from "../../services/itemService"

// component
const ItemDetail = () => {
    // hooks
    const { jobId, boxId, itemId } = useParams()

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

    console.log(item);
    if (!item) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div>
                <h1>{item.name}</h1>
            </div>
            <div>
                <Link to={`/jobs/${jobId}/${boxId}/add-item`}>
                    <button>Edit Box</button>
                </Link>
                <button>Delete Box</button>
            </div>
        </>
    )
}

export default ItemDetail