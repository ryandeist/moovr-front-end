// imports
import { createContext, useState, useEffect } from "react";
import { parseISO, isValid } from "date-fns";
import { getJobs, deleteJob } from "../services/jobService.js";
import { useNavigate } from "react-router";

// hooks
const JobsContext = createContext();

// context
const JobsProvider = ({ children }) => {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // handler functions 
    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId);
            setRefresh((prev) => !prev);
            navigate("/jobs");
        } catch (err) {
            console.log(err);
        };
    };

    const fetchJobs = async () => {
        try {
            const jobs = await getJobs();
            const sortedJobs = jobs
                .map((job) => {
                    const dateString = typeof job.date === "string" ? job.date : null;
                    const parsedDate = dateString ? parseISO(dateString) : null;

                    return {
                        ...job,
                        date: parsedDate && isValid(parsedDate) ? parsedDate : null
                    };
                })
                .sort((a, b) => a.date - b.date); // Sort by date
            setJobs(sortedJobs);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [refresh]);

    console.log("JobsContext", jobs);

    const value = { jobs, setJobs, refresh, setRefresh, handleDelete };

    return (
        <JobsContext.Provider value={value}>
            {children}
        </JobsContext.Provider>
    )
};

// export
export { JobsProvider, JobsContext };