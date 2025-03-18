// imports
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getOneJob, deleteJob } from "../../services/jobservice";

// component
const JobDetail = () => {
    // hooks
    const { jobId } = useParams();
    const navigate = useNavigate();

    // state
    const [job, setJob] = useState(null);


    // fetch selected job
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const fetchedJob = await getOneJob(jobId);
                setJob(fetchedJob);
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
            <div>
                <Link to={`/jobs/edit/${job.id}`}>
                    <button>Edit Job</button>
                </Link>
                <button onClick={handleDelete}>Delete Job</button>
            </div>
        </>
    )
};

export default JobDetail;