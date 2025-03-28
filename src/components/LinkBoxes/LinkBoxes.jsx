import { Link } from 'react-router'

const LinkBoxes = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="cursor-pointer bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 mt-5 rounded-4xl flex justify-center w-[90%] h-[40%] my-auto shadow-lg items-center text-5xl">
                <Link to='/jobs'>All Jobs</Link>
            </div>
            <div className=" cursor-pointer bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 mt-5 rounded-4xl flex justify-center w-[90%] h-[40%] my-auto shadow-lg items-center text-5xl">
                <Link to='/jobs/add-job'>New Job</Link>
            </div>
        </div>
    )
}

export default LinkBoxes;