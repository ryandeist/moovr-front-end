// imports 
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { createBox } from "../../services/boxService";

const BoxForm = () => {
    // hooks
    const navigate = useNavigate();
    const { jobId } = useParams();

    // state
    const [formData, setFormData] = useState({
        box_name: "",
        size: "1",
    });
    const { box_name, size} = formData;
    const [message, setMessage] = useState("");

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const newBox = await createBox(jobId, formData);
            navigate(`/jobs/${jobId}`);
            return console.log(newBox);
        } catch (err) {
            setMessage(err.message);
        };
    };

    const isFormValid = () => {
        return !(
            box_name
        );
    };

    return (
        <>
            <h1>Create a Box</h1>
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
                    <button disabled={isFormValid()}>Create Box</button>
                </div>
            </form>
        </>
    )
};

export default BoxForm