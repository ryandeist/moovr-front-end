//
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';

const Breadcrumb = (props) => {
    // hooks
    const location = useLocation();
    const {jobId, boxId, itemId} = useParams()

    // state
    const [jobName, setJobName] = useState(null)

    useEffect(() => {
        if (jobId) {
            setJobName(props.job.customer_name)
        }
    },[jobId])

    // const variables
    const pathnames = location.pathname.split("/").filter((pathItem) => pathItem);

    const breadcrumbItems = pathnames.map((value, index) => {
        let label = value;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (index === 0) label = "Jobs";
        else if (value === 'add-job') label = 'Add Job';
        else if (index === 1) label = jobName || `Job ${jobId}`;

        return { label, to }
    });

    return (
        <nav className='bg-white text-gray-600 text-sm'>
            <ol className='list-none p-0 inline-flex'>
                {breadcrumbItems.map((item, index) => (
                    <li key={item.to} className='flex items-center'>
                        {index !== 0 && <span className='mx-2 text-gray-400'>/</span>}
                        {index === breadcrumbItems.length - 1 ? (
                            <span className='text-gray-900 font-semibold'>{item.label}</span>
                        ) : (
                            <Link to={item.to} className='text-blue-500 hover:underline'>
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb;