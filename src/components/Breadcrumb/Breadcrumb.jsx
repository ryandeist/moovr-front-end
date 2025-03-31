// imports
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

// service function imports
import { getOneJob } from "../../services/jobService.js";
import { getOneBox } from "../../services/boxService.js";
import { getOneItemInBox } from "../../services/itemService.js";

// component
const Breadcrumb = () => {
    // hooks
    const location = useLocation();
    const { jobId, boxId, itemId } = useParams();

    // state
    const [jobName, setJobName] = useState(null);
    const [boxName, setBoxName] = useState(null);
    const [itemName, setItemName] = useState(null);

    useEffect(() => {
        if (jobId) {
            const fetchJob = async () => {
                const job = await getOneJob(jobId);
                setJobName(job.customer_name);
            }
            fetchJob();
        };

        if (jobId && boxId) {
            const fetchBox = async () => {
                const box = await getOneBox(jobId, boxId);
                setBoxName(box.box_name);
            }
            fetchBox();
        };

        if (jobId && boxId && itemId) {
            const fetchItem = async () => {
                const item = await getOneItemInBox(jobId, boxId, itemId);
                setItemName(item.name);
            }
            fetchItem();
        }
    }, [jobId, boxId, itemId]);

    // const variables
    const pathnames = location.pathname.split("/").filter((pathItem) => pathItem);

    const breadcrumbItems = pathnames.map((value, index) => {
        let label = value;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (index === 0) label = "Jobs";
        else if (value === "add-job") label = "Add Job";
        else if (value === "add-box") label = "Add Box";
        else if (value === "add-item") label = "Add Item";
        else if (value === "edit-job") label = "Edit Job";
        else if (value === "edit-box") label = "Edit Box";
        else if (value === "edit-item") label = "Edit Item";
        else if (index === 1) label = jobName || `Job ${jobId}`;
        else if (index === 2) label = boxName || `Box ${boxId}`;
        else if (index === 3) label = itemName || `Item ${itemId}`;

        return { label, to };
    });

    // returns
    return (
        <nav className="bg-white text-gray-600 text-xs md:text-lg p-1 px-2 rounded-md border-2 border-gray-950">
            <ol className="list-none p-0 inline-flex">
                {breadcrumbItems.map((item, index) => (
                    <li key={item.to} className="flex items-center">
                        {index !== 0 && <span className="mx-1 text-gray-400">/</span>}
                        {index === breadcrumbItems.length - 1 ? (
                            <span className="text-gray-900 font-semibold">{item.label}</span>
                        ) : (
                            <Link to={item.to} className="text-gray-400 hover:text-gray-600">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
};

// export
export default Breadcrumb;