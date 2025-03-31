// imports
import { Link } from 'react-router'
import CowIcon from '/images/cow-logo-cropped.png'
// component
const AboutPage = () => {
    // return
    return (
        <div className="flex flex-col w-[90%] max-w-3xl bg-white mx-auto mt-5 items-center md:text-xl lg:text-2xl border-2 border-gray-950 rounded-lg shadow-lg">
            <img className='w-50 md:w-75 mt-4'src={CowIcon} alt="A logo of a brown cow." />
            <h1 className='text-5xl md:text-7xl'>Moovr</h1>
            <h2 className='text-xl md:text-4xl text-center border-b-2 border-gray-500 w-[90%] p-2 mb-4'>Your Mooving Solution</h2>
            <p className='text-center px-3 mb-4'>Whether you're moving your clients or moving yourself, Moovr can help get the job done by tracking where things are packed. Simply add a job, add boxes and tell Moovr where you're putting your items to make unpacking easier! Got fragile or heavy boxes? Don't worry! Moovr will track that too so you don't accidentally break your valuables.</p>
            <p className='font-semibold border-b-2 border-gray-500 text-center w-[90%] p-4'>Moovr, we'll see you there.</p>
            <p className='text-center my-5 px-3'>This application was built using React, JavaScript, Tailwind, Django, Python and PostgreSQL. Check out the code using the links below.</p>
            <div className="flex flex-row gap-5">
                <a className="flex mx-auto my-4 px-5 py-2 rounded-full bg-yellow-700 hover:bg-yellow-600 text-white" href="https://github.com/ryandeist/moovr-front-end" target="_blank">Front-End Repo</a>
                <a className="flex mx-auto my-4 px-5 py-2 rounded-full bg-yellow-700 hover:bg-yellow-600 text-white" href="https://github.com/ryandeist/moovr-back-end" target="_blank">Back-End Repo</a>
            </div>
        </div>
    )
};

// export
export default AboutPage;