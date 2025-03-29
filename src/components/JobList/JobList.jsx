// imports
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getJobs, deleteJob } from "./../../services/jobService.js";
import Delete from "/images/delete-icon.png";

// component
const JobList = ({ openDeleteModal }) => {
    // state
    const [jobs, setJobs] = useState([]);

    // fetch user job list
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobs = await getJobs();
                const sortedJobs = jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
                setJobs(sortedJobs);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJobs();
    }, []);

    // Function to format date as MM/DD/YY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit"
        });
    };

    // handle delete
    const handleDelete = async (jobId) => {
        try {
            deleteJob(jobId);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        } catch (err) {
            console.log(err);
        };
    };

    //return
    return (
        <div className="flex flex-col md:text-xl lg:text-2xl bg-white w-[90%] border-2 border-gray-950 max-w-3xl my-5 justify-self-center h-auto p-2 gap-3 shadow-lg rounded-lg">
            <div className="flex flex-row justify-start">
                <Link to="/jobs/add-job"><h1 className="flex justify-self-start md:text-xl lg:text-2xl py-1 px-4 rounded-xl bg-yellow-700 hover:bg-yellow-600 text-white">Add Job</h1></Link>
            </div>
            <div className="flex flex-row justify-center items-center gap-1 mb-1 pb-2 border-b-2 border-b-gray-400">
                <h1 className="text-2xl font-bold lg:text-4xl">Your Jobs</h1>
            </div>
            <div className="flex flex-col w-[100%] max-w-3xl justify-self-center gap-y-3">
                {jobs.length === 0 ? (
                    <div className="flex p-2 w-[90%] max-w-3xl mx-auto">
                        <p className="mx-auto font-semibold">This box is empty. Add an item to this box.</p>
                    </div>
                ) : (
                    <div className="flex flex-col w-[100%] max-w-3xl pb-3 gap-y-3">
                        {jobs.map((job) => {
                            const jobDate = new Date(job.date);
                            const today = new Date();

                            const isOverdue = jobDate < today;

                            return (
                                <Link key={job.id} to={`/jobs/${job.id}`}>
                                    <div className="flex flex-row justify-between p-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-xl">
                                        <div className="ml-2 md:ml-5 my-auto ">
                                            <h2 className="flex flex-row font-semibold md:text-2xl lg:text-3xl">{job.customer_name} {isOverdue && <span className="text-sm md:text-lg lg:text-xl bg-white ml-2 px-2 rounded-xl border-2 text-red-600 font-bold my-auto">LATE!</span>}</h2>
                                            <p className="text-sm md:text-base mt-1 lg:text-xl">Move Date: {formatDate(job.date)}</p>
                                        </div>
                                        <div className="flex flex-row items-end my-auto gap-2 mr-2 md:mr-5">
                                            <button
                                                className="my-auto"
                                                onClick={(evt) => {
                                                    evt.preventDefault();
                                                    evt.stopPropagation();
                                                    openDeleteModal(`Are you sure you want to delete ${job.customer_name}?`, () => handleDelete(job.id))
                                                }}
                                            >
                                                <img className="my-auto w-8 md:w-10 lg:w-12 opacity-50 hover:opacity-100 relative" src={Delete} alt="Delete Icon" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
};

// export
export default JobList;