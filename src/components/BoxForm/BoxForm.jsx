// imports 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { createBox, getOneBox, updateBox } from "../../services/boxService";
import Breadcrumb from "../Breadcrumb.jsx/Breadcrumb";

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

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

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
            <div>
                <h1>{props.isEditingBox ? 'Edit Box' : 'Create a Box'}</h1>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="box_name">Box Name: </label>
                        <input
                            type="text"
                            name="box_name"
                            id="box_name"
                            value={box_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="box_description">Box Description: </label>
                        <textarea
                            name="box_description"
                            id="descrbox_descriptioniption"
                            value={box_description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="size">Box Size: </label>
                        <select
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
                    <div>
                        <p>{message}</p>
                    </div>
                    <div>
                        <button disabled={isFormValid()}>{props.isEditingBox ? 'Edit Box' : 'Create Box'}</button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default BoxForm