// imports
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getOneJob } from "../../services/jobservice";

// component
const JobDetail = () => {
    // state
    const [job, setJob] = useState(null);
    const { id } = useParams();

    // fetch selected job
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const fetchedJob = await getOneJob(id);
                setJob(fetchedJob);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJob();
    }, [id]);

    // render loading screen while waiting
    if (!job) {
        return <h1>Loading...</h1>
    }

    // return
    return (
        <>
            <div>
                <h1>{job.customer_name}</h1>
                <p>{job.start_location}</p>
                <p>{job.end_location}</p>
                <p>{job.created_at}</p>
                <p>{job.date}</p>
            </div>
        </>
    )
};

export default JobDetail;