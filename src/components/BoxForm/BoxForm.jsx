// imports 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { createBox, getOneBox, updateBox } from "../../services/boxService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const BoxForm = (props) => {
    // hooks
    const navigate = useNavigate();
    const { jobId, boxId } = useParams();

    // state
    const [formData, setFormData] = useState({
        box_name: "",
        size: "1",
        box_description: "",
    });
    const { box_name, size, box_description } = formData;
    const [message, setMessage] = useState("");

    // fetch box if updating
    useEffect(() => {
        if (props.isEditingBox && boxId) {
            const fetchBox = async () => {
                try {
                    const box = await getOneBox(jobId, boxId);
                    setFormData(box);
                } catch (err) {
                    console.log("Error pulling box data to update", err);
                };
            };
            fetchBox();
        };
    }, [boxId, jobId, props.isEditingBox]);

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (props.isEditingBox) {
            try {
                const editedBox = await updateBox(jobId, boxId, formData);
                navigate(`/jobs/${jobId}/${boxId}`);
                return console.log(editedBox);
            } catch (err) {
                setMessage(err.message);
            };
        } else {
            try {
                const newBox = await createBox(jobId, formData);
                navigate(`/jobs/${jobId}`);
                return console.log(newBox);
            } catch (err) {
                setMessage(err.message);
            };
        };
    };

    // returns
    const isFormValid = () => {
        return !(
            box_name
        );
    };
    
    return (
        <>
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center">
                <Breadcrumb />
            </div>
            <div className="flex flex-col border-2 border-gray-950 bg-white w-[90%] shadow-lg h-auto rounded-lg justify-self-center items-center pt-5 mt-5 max-w-3xl md:pb-5">
                <h1 className="text-3xl md:text-4xl font-bold border-b-2 border-gray-400 w-[80%] text-center pb-2">{props.isEditingBox ? "Edit Box" : "Create a Box"}</h1>
                <form className="mt-4 w-[80%] md:text-lg" autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="box_name">Box Name: </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Box Name"
                            maxLength={50}
                            type="text"
                            name="box_name"
                            id="box_name"
                            value={box_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="box_description">Box Description: </label>
                        <textarea
                            className="resize-none shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Box Description"
                            rows={4}
                            maxLength={250}
                            name="box_description"
                            id="descrbox_descriptioniption"
                            value={box_description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="size">Box Size: </label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 mb-1 text-gray-700 focus:outline-none focus:shadow-outline"
                            value={size}
                            onChange={handleChange}
                            id="size"
                            name="size"
                        >
                            <option value="1">Small</option>
                            <option value="2">Medium</option>
                            <option value="3">Large</option>
                            <option value="4">Extra Large</option>
                        </select>
                    </div>
                    <button className={`flex justify-self-center px-5 py-2 my-4 rounded-full transition-colors ${isFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-600 text-white"}`} disabled={isFormValid()}>{props.isEditingBox ? "Edit Box" : "Create Box"}</button>
                    <p className="text-red-500 justify-self-center mt-1">{message}</p>
                </form>
            </div>
        </>
    )
};

// export
export default BoxForm;