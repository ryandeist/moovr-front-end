// imports
import { useState, useEffect } from 'react';
import { getJobs } from '../../services/jobservice';
import { Link } from 'react-router';

// component
const JobList = () => {
    // state
    const [jobs, setJobs] = useState([]);

    // fetch user job list
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
    }, []);

    // to display if no jobs.
    if (jobs.length === 0) {
        return <h1>No Jobs to Show.</h1>
    };
    
    //return
    return (
        <>
            {jobs.map((job) => (
                <div key={job.id}>
                    <div>
                        <h2>{job.customer_name}</h2>
                        <p>{job.date}</p>
                    </div>
                    <div>
                        <Link to={`/jobs/${job.id}`}>Job Details</Link>
                    </div>
                </div>
            ))}
        </>
    )
};

// export
export default JobList;