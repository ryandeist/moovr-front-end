import { useState, useEffect } from 'react';
import { getJobs } from '../services/jobservice.js';

// component
const JobList = () => {
    // state
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobs = await getJobs();
                setJobs(jobs);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJobs();
    }, []) 

    return (
        <>
            {jobs.map((job) => (
                <div key={job.id}>
                    {job.name}
                </div>
            ))}
        </>
    )
}

export default JobList;