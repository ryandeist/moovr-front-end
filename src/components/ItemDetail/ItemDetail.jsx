// imports
import {useState, useEffect} from "react"
import { useParams } from "react-router"
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
    
    return (
        <>
            <h1>This is Item Detail.</h1>
        </>
    )
}

export default ItemDetail