import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createJob, editJob, getOneJob } from "../../services/jobService";
import Breadcrumb from "../Breadcrumb.jsx/Breadcrumb";

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
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center">
                <Breadcrumb />
            </div>       
            <div className='flex flex-col bg-white w-[90%] shadow-lg h-120 rounded-lg justify-self-center items-center pt-5 mt-5 max-w-3xl'>
                <h1 className='text-3xl font-bold'>{props.isEditingJob ? 'Edit Job' : 'Add Job'}</h1>
                <form className='mt-4 w-[80%]' autoComplete='off' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-gray-700 text-l font-bold mb-2' htmlFor="customer_name">Customer Name: </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder="Enter Customer Name"
                            type="text"
                            name="customer_name"
                            id="customer_name"
                            value={customer_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-l font-bold mb-2' htmlFor="start_location">Starting Location: </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder="Enter Pickup Location"
                            type="text"
                            name="start_location"
                            id="start_location"
                            value={start_location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-l font-bold mb-2' htmlFor="end_location">Ending Location: </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder="Enter Destination"
                            type="text"
                            id="end_location"
                            name="end_location"
                            value={end_location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-l font-bold mb-2' htmlFor="date">Move Date: </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className={`flex justify-self-center px-5 py-2 rounded-full transition-colors ${isFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-500 text-white"}`} disabled={isFormValid()}>{props.isEditingJob ? 'Edit Job' : 'Create Job'}</button>
                    <p>{message}</p>
                </form>
            </div>
        </>
    )
};

// exports
export default JobForm