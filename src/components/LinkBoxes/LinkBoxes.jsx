// imports
import { Link } from "react-router"

// component
const LinkBoxes = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Link  className="cursor-pointer bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 mt-5 rounded-4xl flex justify-center w-[90%] h-[40%] my-auto shadow-lg items-center text-5xl"to="/jobs"><div>
                Your Jobs
            </div></Link>
            <Link className="cursor-pointer bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 mt-5 rounded-4xl flex justify-center w-[90%] h-[40%] my-auto shadow-lg items-center text-5xl" to="/jobs/add-job"><div>
                New Job
            </div></Link>
        </div>
    )
}

// export
export default LinkBoxes;