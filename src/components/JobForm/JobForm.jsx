import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createJob, editJob, getOneJob } from "../../services/jobservice";

// components
const JobForm = (props) => {
    // hooks
    const navigate = useNavigate();
    const { jobId } = useParams();

    // state variables
    const [formData, setFormData] = useState({
        customer_name: "",
        start_location: "",
        end_location: "",
        date: "",
    });
    const { customer_name, start_location, end_location, date } = formData;

    const [message, setMessage] = useState("");

    // fetch job if updating
    useEffect(() => {
        if (props.isEditingJob && jobId) {
            const fetchJob = async () => {
                try {
                    const job = await getOneJob(jobId);
                    setFormData(job);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchJob();
        }
    }, [jobId, props.isEditingJob]);

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (props.isEditingJob) {
            try {
                const editedJob = await editJob(jobId, formData);
                navigate(`/jobs/${jobId}`);
                return console.log(editedJob);
            } catch (err) {
                setMessage(err.message);
            };
        } else {
            try {
                const newJob = await createJob(formData);
                navigate("/jobs");
                return console.log(newJob);
            } catch (err) {
                setMessage(err.message);
            };
        };
    };

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
            <h1>{props.isEditingJob ? 'Edit Job' : 'Create a Job'}</h1>
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
                <button disabled={isFormValid()}>{props.isEditingJob ? 'Edit Job' : 'Create Job'}</button>
            </form>
        </>
    )
};

// exports
export default JobForm