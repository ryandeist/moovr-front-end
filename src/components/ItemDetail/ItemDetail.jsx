// imports
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

// service function imports
import { deleteItem, getOneItemInBox } from "../../services/itemService.js";

// component imports
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import LoadingComponent from "../LoadingComponent/LoadingComponent.jsx";

// icon imports
import FragileIcon from "/images/fragile-icon.png";
import HeavyIcon from "/images/heavy-icon.png";

// component
const ItemDetail = ({ openDeleteModal }) => {
    // hooks
    const { jobId, boxId, itemId } = useParams();
    const navigate = useNavigate();

    // state
    const [item, setItem] = useState(null);


    // get item to show
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItem = await getOneItemInBox(jobId, boxId, itemId);
                setItem(fetchedItem);
            } catch (err) {
                console.log(err);
            }
        }
        fetchItem();
    }, [jobId, boxId, itemId]);

    // handler function
    const handleDelete = async () => {
        try {
            await deleteItem(jobId, boxId, itemId);
            navigate(`/jobs/${jobId}/${boxId}`);
        } catch (err) {
            console.log("Error Deleting Item", err);
        };
    };

    // returns
    return (
        <div className="flex flex-col items-center">
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center">
                <Breadcrumb />
            </div>
            <div className="flex flex-col md:text-xl lg:text-2xl bg-white w-[90%] border-2 border-gray-950 max-w-3xl mt-5 justify-self-center p-2 gap-3 shadow-lg rounded-lg">
                {!item ? <LoadingComponent /> :
                    <>
                        <div className="flex flex-row justify-between border-b-2 pb-2 border-gray-400">
                            <div>
                                <div className="flex flex-row gap-1">
                                    <h1 className="font-semibold">Item Name: </h1><p>{item.name}</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <p className="font-semibold my-auto">Labels: </p>{item.is_heavy && <img className="w-10" src={HeavyIcon} alt="an icon of a man lifting a heavy box" />}{item.is_fragile && <img className="w-10" src={FragileIcon} alt="a fragile item icon" />}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link to={`/jobs/${jobId}/${boxId}/${item.id}/edit-item`}><h1 className="text-center bg-yellow-700 hover:bg-yellow-600 text-white py-1 px-4 rounded-xl">Edit</h1></Link>
                                <button onClick={() => openDeleteModal(`Are you sure you want to remove ${item.name}?`, () => handleDelete(item.id))}>
                                    <h1 className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded-xl text-center cursor-pointer">Remove</h1>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row">
                                <h1 className="font-semibold w-[50%]">Description:</h1>
                            </div>
                            <p>{item.description}</p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
};

// export
export default ItemDetail;