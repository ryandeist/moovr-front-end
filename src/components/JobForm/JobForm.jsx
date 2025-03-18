import { useState } from "react";
import { useNavigate } from "react-router";
import { createJob } from "../../services/jobservice"; 

// components
const JobForm = () => {
    // hooks
    const navigate = useNavigate();

    // state variables
    const [formData, setFormData] = useState({
        customer_name: "",
        start_location: "",
        end_location: "",
        date: "",
    });

    const [message, setMessage] = useState("");
    const { customer_name, start_location, end_location, date } = formData;

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const newJob = await createJob(formData);
            navigate("/jobs");
            return console.log(newJob)
        } catch (err) {
            setMessage(err.message);
        }
    }

    // predicate function
    const isFormValid = () => {
        return !(
            customer_name &&
            start_location &&
            end_location &&
            date
        );
    };

    // return
    return (
        <>
            <h1>Create a Job</h1>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customer_name">Customer Name: </label>
                    <input
                        type="text"
                        name="customer_name"
                        id="customer_name"
                        value={customer_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="start_location">Starting Location: </label>
                    <input
                        type="text"
                        name="start_location"
                        id="start_location"
                        value={start_location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end_location">Ending Location: </label>
                    <input
                        type="text"
                        id="end_location"
                        name="end_location"
                        value={end_location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Ending Location: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <p>{message}</p>
                <button disabled={isFormValid()}>Sign In</button>
            </form>
        </>
    )
};

// exports
export default JobForm