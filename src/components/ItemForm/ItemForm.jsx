// imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createItem, editItem, getOneItemInBox } from "../../services/itemService";
import { getBoxes } from "../../services/boxService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


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
    const [defaultBox, setDefaultBox] = useState();

    // fetch boxes for select
    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                const fetchedBoxes = await getBoxes(jobId);
                const defaultBox = fetchedBoxes.find((box) => box.id === Number(boxId));
                setDefaultBox(defaultBox);

                if (fetchedBoxes.length > 0) {
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
                    const fetchedItem = await getOneItemInBox(jobId, boxId, itemId);
                    setFormData(fetchedItem);
                } catch (err) {
                    console.log("Error fetching Item to update.", err);
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
                const editedItem = await editItem(jobId, boxId, itemId, formData);
                navigate(`/jobs/${jobId}/${formData.box}/${itemId}`);
                return console.log(editedItem);
            } catch (err) {
                console.log("Error updating item.", err);
            }
        } else {
            try {
                const newItem = await createItem(jobId, boxId, formData);
                navigate(`/jobs/${jobId}/${boxId}`);
                return console.log(newItem);
            } catch (err) {
                setMessage(err.message);
            };
        };
    };

    // predicate function
    const isFormValid = () => {
        return !(
            name
        );
    };

    // returns
    if (!defaultBox) {
        return <h1>Loading...</h1>
    };

    return (
        <>
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center">
                <Breadcrumb />
            </div>
            <div className="flex flex-col border-2 border-gray-950 bg-white w-[90%] shadow-lg h-auto rounded-lg justify-self-center items-center pt-5 mt-5 max-w-3xl md:pb-5">
                <h1 className="text-3xl md:text-4xl font-bold border-b-2 border-gray-400 w-[80%] text-center pb-2">{props.isEditingItem ? "Edit Item" : "Add Item"}</h1>
                <form className="mt-4 w-[80%] md:text-lg" autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="name">Item Name: </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Item Name"
                            maxLength={50}
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="description">Item Description: </label>
                        <textarea
                            className="resize-none shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Item Description"
                            rows={4}
                            maxLength={250}
                            name="description"
                            id="description"
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center gap-4 w-[50%]">
                            <label className="block text-gray-700 text-l font-bold my-auto" htmlFor="is_fragile">Fragile: </label>
                            <input
                                type="checkbox"
                                id="is_fragile"
                                name="is_fragile"
                                checked={is_fragile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-row items-center gap-4 w-[50%]">
                            <label className="block text-gray-700 text-l font-bold my-auto" htmlFor="is_heavy">Heavy: </label>
                            <input
                                type="checkbox"
                                id="is_heavy"
                                name="is_heavy"
                                checked={is_heavy}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="box">Box: </label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 mb-1 text-gray-700 focus:outline-none focus:shadow-outline"
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

                    <button className={`flex justify-self-center px-5 py-2 my-4 rounded-full transition-colors ${isFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-600 text-white"}`} disabled={isFormValid()}>{props.isEditingItem ? "Edit Item" : "Create Item"}</button>
                    <p className="text-red-500 justify-self-center mt-1">{message}</p>
                </form>
            </div>
        </>
    )
};

// exports
export default ItemForm;