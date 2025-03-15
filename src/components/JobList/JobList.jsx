import { useState, useEffect } from 'react';
import { getJobs } from '../../services/jobService.js';

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

    if (!jobs) {
        return <h1>No Jobs to Show.</h1>
    }
    
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