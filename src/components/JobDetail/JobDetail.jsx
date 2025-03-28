// imports
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getOneJob, deleteJob } from "../../services/jobService";
import { getBoxes } from "../../services/boxService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BoxIcon from "../../../public/images/cardboard-box-logo.png";

// component
const JobDetail = ({ openDeleteModal }) => {
    // hooks
    const { jobId } = useParams();
    const navigate = useNavigate();

    // state
    const [job, setJob] = useState(null);
    const [boxes, setBoxes] = useState([]);

    // fetch selected job and boxes associates with that job
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const fetchedJob = await getOneJob(jobId);
                setJob(fetchedJob);
                const fetchedBoxes = await getBoxes(jobId);
                setBoxes(fetchedBoxes);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJob();
    }, [jobId]);

    // handler functions
    const handleDelete = async () => {
        try {
            deleteJob(jobId);
            navigate("/jobs");
        } catch (err) {
            console.log(err);
        }
    }

    // Function to format date as MM/DD/YY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        });
    };

    // check if job is late
    const isJobLate = () => {
        const today = new Date();
        const jobDate = new Date(job.date);
        return jobDate < today;
    };


    // render loading screen while waiting
    if (!job) {
        return <h1>Loading...</h1>
    }

    // return
    return (
        <>
            <div className="flex w-[90%] max-w-3xl mt-5 justify-self-center ">
                <Breadcrumb />
            </div>
            <div className="flex bg-white w-[90%] border-2 border-gray-950 max-w-3xl mt-5 justify-self-center flex-col p-2 gap-3 shadow-lg rounded-lg sm:text-2xl">
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="flex flex-row gap-1">
                            <h1 className="font-semibold">Customer: </h1><p >{` ${job.customer_name}`}</p>
                        </div>
                        <div className={`flex flex-row gap-1 ${isJobLate() ? 'text-red-600' : ''}`}>
                            <h2 className="font-semibold">Move Date:</h2><p>{formatDate(job.date)}</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <h2 className="font-semibold">Total Boxes:</h2><p>{boxes.length}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link to={`/jobs/${job.id}/edit-job`}><h1 className='text-center bg-yellow-700 hover:bg-yellow-600 text-white py-1 px-4 rounded-xl'>Edit</h1></Link>
                        <button onClick={() => openDeleteModal(`Are you sure you want to delete ${job.customer_name}?`, () => handleDelete(job.id))}>
                            <h1 className='bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded-xl text-center'>Delete</h1>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-1">
                        <div className="font-semibold">Start:</div><div>{job.start_location}</div>
                    </div>
                    <div className="flex flex-row gap-1">
                        <div className="font-semibold">End:</div><div>{job.end_location}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[90%] max-w-3xl justify-self-center bg-white border-2 border-gray-950 my-5 p-2 gap-1 shadow-lg rounded-lg">

                <div className='flex-row justify-start'>
                    <Link className='flex justify-self-start bg-yellow-700 hover:bg-yellow-600 text-white py-1 px-4 rounded-xl' to={`/jobs/${job.id}/add-box`}>Add Box</Link>
                </div>
                <div className="flex flex-row justify-center items-center gap-1 mb-1 pb-2 border-b-2 border-b-gray-400">
                    <img src={BoxIcon} className="w-11" alt="" />
                    <h1 className="mt-1 text-2xl font-bold lg:text-4xl">Boxes</h1>
                    <img src={BoxIcon} className="w-11" alt="" />
                </div>
                {boxes.length === 0 ? (
                    <div className='flex p-2 w-[90%] max-w-3xl mx-auto'>
                        <p className='mx-auto font-semibold'>No boxes to display. Add a box to this job.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 mx-auto w-[100%]">
                        {boxes.map((box) => (
                            <Link to={`/jobs/${job.id}/${box.id}`} key={box.id}><div className='flex flex-col box-content w-[100%] aspect-square bg-yellow-700 hover:bg-yellow-600 rounded-xl items-center'>
                                <div className="my-auto" >
                                    <h1 className='text-center text-white text-2xl font-semibold'> Box #{box.id}</h1>
                                    <p className='text-center text-white'>{box.box_name}</p>
                                    <p className='text-center text-white'>Size: {box.size_display}</p>
                                </div>
                            </div></Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
};

export default JobDetail;