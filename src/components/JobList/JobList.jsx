// imports
import { useState, useEffect } from 'react';
import { getJobs } from '../../services/jobService';
import { Link } from 'react-router';
import Delete from '../../../public/images/delete-icon.png';
import { deleteJob } from '../../services/jobService';

// component
const JobList = () => {
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
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        });
    };

    // handle delete
    const handleDelete = async (jobId) => {
        try {
            deleteJob(jobId);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        } catch (err) {
            console.log(err);
        }
    }

    // to display if no jobs.
    if (jobs.length === 0) {
        return (
            <>
                <div className='flex w-[90%] max-w-3xl mx-auto mt-3 text-lg p-2'>
                    <Link to='/jobs/add-job'><h1 className='bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 rounded-xl'>Add Job</h1></Link>
                </div>
                <div className='flex justify-self-center text-2xl font-bold mt-2 text-white lg:text-4xl'>
                    <h1>Your Jobs</h1>
                </div>
                <div className='flex justify-center p-2 border-2 border-gray-950 bg-white rounded-xl w-[90%] max-w-3xl mt-3 justify-self-center'>
                    <p className='text-center font-semibold'>No jobs to display. Add a job to get started.</p>
                </div>
            </>
        )
    };

    //return
    return (
        <>
            <div className='flex w-[90%] max-w-3xl mx-auto mt-3 text-lg p-2'>
                <Link to='/jobs/add-job'><h1 className='bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 rounded-xl'>Add Job</h1></Link>
            </div>
            <div className='flex justify-self-center text-2xl font-bold mt-2 text-white lg:text-4xl'>
                <h1>Your Jobs</h1>
            </div>
            <div className='flex flex-col w-[90%] max-w-3xl mt-3 justify-self-center gap-y-3'>
                {jobs.map((job) => {
                    const jobDate = new Date(job.date);
                    const today = new Date();

                    const isOverdue = jobDate < today;

                    return (
                        <div key={job.id} className='flex justify-between p-2 border-2 border-gray-950 bg-white rounded-xl'>
                            <div className='ml-2 md:ml-5'>
                                <h2 className='font-semibold md:text-2xl'>{job.customer_name} {isOverdue && <span className="text-base text-red-600 font-bold my-auto">LATE!</span>}</h2>
                                <p className='text-sm md:text-base'>Move Date: {formatDate(job.date)}</p>
                            </div>
                            <div className='flex flex-row items-end my-auto gap-2 mr-2 md:mr-5'>
                                <div className='my-auto'>
                                    <Link to={`/jobs/${job.id}`}><p className='bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 rounded-xl'>Details</p></Link>
                                </div>
                                <button onClick={() => handleDelete(job.id)}><img className='my-auto w-8 opacity-50 hover:opacity-100' src={Delete} alt="cardboard box logo" /></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

// export
export default JobList;