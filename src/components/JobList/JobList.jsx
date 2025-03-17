import { useState, useEffect } from 'react';
import { getJobs } from '../../services/jobService.js';
import { Link } from 'react-router';

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
    }, [jobs])

    if (jobs.length === 0) {
        return <h1>No Jobs to Show.</h1>
    }

    return (
        <>
            {jobs.map((job) => (
                <div key={job.id}>
                    <div>
                        <h2>{job.name}</h2>
                        <p>{job.date}</p>
                    </div>
                    <div>
                        <Link to={`/jobs/${job.id}`}>Job Details</Link>
                    </div>
                </div>
            ))}
        </>
    )
}

export default JobList;