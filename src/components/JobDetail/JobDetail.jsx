// imports
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import { parseISO, isValid } from "date-fns";

// service function imports
import { getBoxes } from "../../services/boxService.js";

// component imports
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import LoadingComponent from "../LoadingComponent/LoadingComponent.jsx";
import { JobsContext } from "../../contexts/JobsContext.jsx";

// icon imports
import BoxIcon from "/images/cardboard-box-logo.png";
import FragileIcon from "/images/fragile-icon.png";
import HeavyIcon from "/images/heavy-icon.png";

// component
const JobDetail = ({ openDeleteModal }) => {
    // hooks
    const { jobId } = useParams();
    const { jobs, handleDelete} = useContext(JobsContext);

    // state
    const [job, setJob] = useState(null);
    const [boxes, setBoxes] = useState([]);

    // fetch selected job and boxes associates with that job
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const fetchedJob = (jobs ? jobs.find((job) => job.id === Number(jobId)) : null);
                const fetchedBoxes = await getBoxes(jobId);

                const sortedBoxes = fetchedBoxes.sort((a, b) => a.id - b.id);

                setBoxes(sortedBoxes);
                setJob(fetchedJob);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJob();
    }, [jobs, jobId]);

    // Function to format date as MM/DD/YY
    const formatDate = (dateInput) => {
        if (!dateInput) return "";

        const date = (dateInput instanceof Date) ? dateInput : parseISO(dateInput);

        return isValid(date)
            ? date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit"
            })
            : "Invalid Date";
    };

    // check if job is late
    const isJobLate = () => {
        const today = new Date();
        const jobDate = new Date(job.date);
        return jobDate < today;
    };

    // return
    return (
        <div className="flex flex-col w-[100%] max-w-3xl mx-auto items-center">
            <div className="flex w-[90%] max-w-3xl mt-5">
                <Breadcrumb />
            </div>
            <div className="flex bg-white w-[90%] mx-auto md:text-xl lg:text-2xl border-2 border-gray-950 max-w-3xl mt-5 flex-col p-2 gap-3 shadow-lg rounded-lg">
                {!job ? <LoadingComponent /> :
                    <>
                        <div className="flex flex-row justify-between">
                            <div>
                                <div className="flex flex-row gap-1">
                                    <h1 className="font-semibold">Customer: </h1><p >{` ${job.customer_name}`}</p>
                                </div>
                                <div className={`flex flex-row gap-1 ${isJobLate() ? "text-red-600" : ""}`}>
                                    <h2 className="font-semibold">Move Date:</h2><p>{formatDate(job.date)}</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <h2 className="font-semibold">Total Boxes:</h2><p>{boxes.length}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <Link to={`/jobs/${job.id}/edit-job`}><h1 className="text-center bg-yellow-700 hover:bg-yellow-600 text-white py-1 px-4 rounded-xl">Edit</h1></Link>
                                <button onClick={() => openDeleteModal(`Are you sure you want to delete ${job.customer_name}?`, () => handleDelete(job.id))}>
                                    <h1 className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded-xl text-center cursor-pointer">Delete</h1>
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
                    </>
                }
            </div>
            <div className="flex flex-col w-[90%] max-w-3xl bg-white border-2 border-gray-950 my-5 p-2 gap-1 shadow-lg rounded-lg">
                {!job ? <LoadingComponent /> :
                    <>
                        <div className="mt-2">
                            <Link className="md:text-xl lg:text-2xl bg-yellow-700 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl" to={`/jobs/${job.id}/add-box`}>Add Box</Link>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-1 mb-1 pb-2 border-b-2 border-b-gray-400">
                            <img src={BoxIcon} className="w-11" alt="a picture of a box" />
                            <h1 className="mt-1 text-2xl font-bold lg:text-4xl">Boxes</h1>
                            <img src={BoxIcon} className="w-11" alt="a picture of a box" />
                        </div>
                        {boxes.length === 0 ? (
                            <div className="flex p-2 w-[90%] max-w-3xl mx-auto">
                                <p className="mx-auto font-semibold">No boxes to display. Add a box to this job.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 mx-auto w-[100%]">
                                {boxes.map((box) => (
                                    <Link to={`/jobs/${job.id}/${box.id}`} key={box.id}><div className="flex flex-col box-content w-[100%] aspect-square bg-yellow-700 hover:bg-yellow-600 rounded-xl items-center">
                                        <div className="my-auto gap-6 md:gap-2 flex flex-col w-[90%] items-center" >
                                            <div>
                                                <h1 className="text-center text-white text-2xl font-semibold"> Box #{box.id}</h1>
                                                <p className="text-center text-white">{box.box_name}</p>
                                                <p className="text-center text-white">Size: {box.size_display}</p>
                                            </div>
                                            {box.box_full || box.is_heavy || box.is_fragile ? (
                                                <div className="bg-white flex w-[80%] md:w-[90%] lg:w-[100%] border-2 border-gray-950 rounded-xl py-1 px-2">
                                                    {box.is_heavy && <img className="w-[33%] mx-auto" src={HeavyIcon} alt="an icon of person lifting a heavy box" />}
                                                    {box.is_fragile && <img className="w-[33%] mx-auto" src={FragileIcon} alt="a fragile item icon" />}
                                                    {box.box_full && <p className="text-red-600 text-center font-semibold text-sm md:text-base lg:text-lg my-auto mx-auto w-[33%]">Full!</p>}
                                                </div>
                                            ) : (
                                                <div className="bg-white flex w-[80%] md:w-[90%] lg:w-[100%] border-2 border-gray-950 rounded-xl py-1 px-2">
                                                    <p className="text-center font-semibold text-sm md:text-base lg:text-lg my-auto w-[100%]">No Labels</p>
                                                </div>
                                            )}
                                        </div>
                                    </div></Link>
                                ))}
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    )
};

//export
export default JobDetail;