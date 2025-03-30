// imports
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { deleteBox, getOneBox, updateBox } from "../../services/boxService.js";
import { getItemsInBox, deleteItem } from "../../services/itemService.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import LampIcon from "/images/lamp-icon.png";
import Delete from "/images/delete-icon.png";
import HeavyIcon from "/images/heavy-icon.png"
import FragileIcon from "/images/fragile-icon.png"

// component
const BoxDetail = ({ openDeleteModal }) => {
    // hooks
    const { jobId, boxId } = useParams();
    const navigate = useNavigate();

    // state
    const [box, setBox] = useState();
    const [items, setItems] = useState([]);

    // get box and items
    useEffect(() => {
        const fetchBox = async () => {
            try {
                const fetchedBox = await getOneBox(jobId, boxId);
                const itemsInBox = await getItemsInBox(jobId, boxId);

                setBox(fetchedBox);
                setItems(itemsInBox);

                const hasFragileItem = itemsInBox.some(item => item.is_fragile);
                const hasHeavyItem = itemsInBox.some(item => item.is_heavy);

                if (hasFragileItem !== fetchedBox.is_fragile) {
                    const updatedBox = { ...fetchedBox, is_fragile: hasFragileItem };
                    setBox(updatedBox);
                    await updateBox(jobId, boxId, updatedBox);
                }

                if (hasHeavyItem !== fetchedBox.is_heavy) {
                    const updatedBox = { ...fetchedBox, is_heavy: hasHeavyItem };
                    setBox(updatedBox);
                    await updateBox(jobId, boxId, updatedBox);
                }

            } catch (err) {
                console.log("Error Fetching Box", err);
            };
        };
        fetchBox();
    }, [boxId, jobId, items.length]);

    // toggle box full status and update box
    const toggleBoxFull = async () => {
        try {
            const updatedBox = { ...box, box_full: !box.box_full };
            setBox(updatedBox);

            await updateBox(jobId, boxId, updatedBox);
        } catch (err) {
            console.log("Error updating box status", err);
        };
    };

    // handler functions
    const handleDeleteBox = async () => {
        try {
            deleteBox(jobId, boxId);
            navigate(`/jobs/${jobId}`);
        } catch (err) {
            console.log("Error Deleting Box.", err);
        };
    };

    const handleDeleteItem = async (jobId, boxId, itemId) => {
        try {
            await deleteItem(jobId, boxId, itemId);
            setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        } catch (err) {
            console.log("Error Deleting Item", err);
        };
    };

    if (!box) {
        return <h1>Loading...</h1>
    };

    // return
    return (
        <div className="flex flex-col w-[100%] items-center">
            <div className="flex w-[90%] max-w-3xl mt-5">
                <Breadcrumb />
            </div>
            <div className="flex flex-col md:text-xl lg:text-2xl bg-white w-[90%] border-2 border-gray-950 max-w-3xl mt-5 p-2 gap-3 shadow-lg rounded-lg">
                <div className="flex flex-row justify-between border-b-2 pb-2 border-gray-400">
                    <div>
                        <div className="flex flex-row gap-1">
                            <h1 className="font-semibold">Box Name: </h1><p>{box.box_name}</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <h1 className="font-semibold">Size: </h1><p>{box.size_display}</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <p className="font-semibold my-auto">Labels: </p>{box.is_heavy && <img className="w-10" src={HeavyIcon} alt="an icon of a man lifting a heavy box" />}{box.is_fragile && <img className="w-10" src={FragileIcon} alt="a fragile item icon" />}{box.box_full && <p className="text-red-600 my-auto">Full!</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link to={`/jobs/${jobId}/${box.id}/edit-box`}><h1 className="text-center bg-yellow-700 hover:bg-yellow-600 text-white py-1 px-4 rounded-xl">Edit</h1></Link>
                        <button onClick={() => openDeleteModal(`Are you sure you want to unpack ${box.box_name}?`, () => handleDeleteBox(box.id))}>
                            <h1 className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded-xl text-center cursor-pointer">Unpack</h1>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row">
                        <h1 className="font-semibold w-[50%]">Description:</h1>
                        <div className="w-[50%] flex justify-end items-center">
                            <label htmlFor="boxFullCheckbox" className=" mr-2 cursor-pointer">Box Full: </label>
                            <input
                                type="checkbox"
                                id="boxFullCheckbox"
                                checked={box.box_full}
                                onChange={toggleBoxFull}
                                className="w-5 h-5 cursor-pointer border-2 border-gray-300 rounded-md checked:bg-red-600 checked:border-red-600 focus:ring-2 focus:ring-red-yellow-600"
                            />
                        </div>
                    </div>
                    <p>{box.box_description}</p>
                </div>
            </div>
            <div className="flex flex-col w-[90%] max-w-3xl justify-self-center bg-white border-2 border-gray-950 my-5 p-2 gap-1 shadow-lg rounded-lg">
                <div className="my-2">
                    <Link className={`md:text-xl lg:text-2xl py-2 px-4 rounded-xl ${box.box_full ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-600 text-white"}`} to={box.box_full ? "#" : `/jobs/${jobId}/${boxId}/add-item`}>Add Item</Link>
                </div>
                <div className="flex flex-row justify-center items-center gap-1 mb-1 pb-2 border-b-2 border-b-gray-400">
                    <img src={LampIcon} className="w-11" alt="a picture of a lamp" />
                    <h1 className="mt-1 text-2xl font-bold lg:text-4xl">Items</h1>
                    <img src={LampIcon} className="w-11" alt="a picture of a lamp" />
                </div>
                {items.length === 0 ? (
                    <div className="flex p-2 w-[90%] max-w-3xl mx-auto">
                        <p className="mx-auto font-semibold">This box is empty. Add an item to this box.</p>
                    </div>
                ) : (
                    <div className="flex flex-col w-[90%] max-w-3xl mt-3 mx-auto pb-3 gap-y-3">
                        {items.map((item) => (
                            <Link key={item.id} to={`/jobs/${jobId}/${boxId}/${item.id}`}>
                                <div className="flex justify-between p-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-xl">
                                    <div className="ml-2 md:ml-5 my-auto">
                                        <h2 className="font-semibold md:text-2xl lg:text-3xl">{item.name}</h2>
                                    </div>
                                    <div className="flex flex-row items-end my-auto gap-2 mr-2 md:mr-5">
                                        <button
                                            className="my-auto"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                evt.stopPropagation();
                                                openDeleteModal(`Are you sure you want to remove ${item.name} from the box?`, () => handleDeleteItem(jobId, boxId, item.id))
                                            }}
                                        >
                                            <img className="my-auto w-8 md:w-10 lg:w-12 opacity-50 hover:opacity-100 relative" src={Delete} alt="Delete Icon" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};

// export
export default BoxDetail;