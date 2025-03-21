import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createItem, editItem, getOneItemInBox } from "../../services/itemService";
import { getBoxes } from "../../services/boxService";


// components
const ItemForm = (props) => {
    // hooks
    const navigate = useNavigate();
    const { jobId, boxId, itemId } = useParams();

    // state variables
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        is_fragile: false,
        is_heavy: false,
        box: boxId
    });
    const { name, description, is_fragile, is_heavy, box } = formData;
    const [message, setMessage] = useState("");
    const [boxes, setBoxes] = useState([]);
    const [defaultBox, setDefaultBox] = useState()

    // fetch boxes for select
    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                const fetchedBoxes = await getBoxes(jobId);
                const defaultBox = fetchedBoxes.find((box) => box.id === Number(boxId));

                if (defaultBox) {
                    setDefaultBox(defaultBox);
                    setBoxes(fetchedBoxes.filter((box) => box.id !== Number(boxId)));
                } else {
                    setBoxes(fetchedBoxes);
                }
            } catch (err) {
                console.log("Error fetching boxes", err);
            }
        };
        fetchBoxes();
        if (props.isEditingItem && itemId) {
            const fetchItem = async () => {
                try {
                    const fetchedItem = await getOneItemInBox(jobId, boxId, itemId)
                    setFormData(fetchedItem)
                } catch (err) {
                    console.log('Error fetching Item to update.', err)
                }
            }
            fetchItem();
        }
    }, [jobId, boxId, itemId, props.isEditingItem]);

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        const { name, value, checked, type } = evt.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value, 
        }));
    };


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (props.isEditingItem) {
            try {
                const editedItem = await editItem(jobId, boxId, itemId, formData)
                navigate(`/jobs/${jobId}/${formData.box}/${itemId}`)
                return console.log(editedItem)
            } catch (err) {
                console.log('Error updating item.', err)
            }
        } else {
            try {
                const newItem = await createItem(jobId, boxId, formData);
                navigate(`/jobs/${jobId}/${boxId}`);
                return console.log(newItem);
            } catch (err) {
                setMessage(err.message);
            };
        }
    };

    // predicate function
    const isFormValid = () => {
        return !(
            name
        );
    };

    if (!defaultBox || boxes.length === 0) {
        return <h1>Loading...</h1>
    }

    // return
    return (
        <>
            <h1>{props.isEditingItem ? 'Edit Item' : 'Create an Item'}</h1>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Item Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Item Description: </label>
                    <textarea
                        name="description"
                        id="description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="is_fragile">Fragile: </label>
                    <input
                        type="checkbox"
                        id="is_fragile"
                        name="is_fragile"
                        checked={is_fragile}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="is_heavy">Heavy: </label>
                    <input
                        type="checkbox"
                        id="is_heavy"
                        name="is_heavy"
                        checked={is_heavy}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="box">Box: </label>
                    <select
                        name="box"
                        id="box"
                        onChange={handleChange}
                        value={box}
                    >
                        {defaultBox && (
                            <option value={defaultBox.id}>{defaultBox.box_name}</option>
                        )}
                        {boxes.map((box) => (
                            <option key={box.id} value={box.id}>
                                {box.box_name}
                            </option>
                        ))}
                    </select>
                </div>
                <p>{message}</p>
                <button disabled={isFormValid()}>{props.isEditingItem ? 'Edit Item' : 'Create Item'}</button>
            </form>
        </>
    )
};

// exports
export default ItemForm