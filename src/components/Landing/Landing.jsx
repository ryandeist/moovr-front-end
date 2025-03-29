import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import LoginForm from '../LoginForm/LoginForm';
import LinkBoxes from '../LinkBoxes/LinkBoxes';
import CowLogo from '../../../public/images/cow-logo.png';

const Landing = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className='flex flex-col lg:flex-row lg:h-[40%] p-5 lg:pt-10 items-top w-[100%] justify-around mx-auto max-w-7xl'>
                <section className='hidden lg:block items-center flex-col pb-5 bg-white border-2 border-gray-950 w-[100%] lg:w-[40%] shadow-lg h-110 rounded-lg justify-items-center'>
                    <img src={CowLogo} alt="A logo of a brown cow" className='w-75 relative'/>
                    <h1 className='text-4xl font-bold'>Welcome to Moovr</h1>
                    <p className='text-xl'>Your Mooving Solution</p>
                </section>
                {user ? (
                    <section className='bg-white border-2 border-gray-950 w-[100%] lg:w-[40%] h-110 rounded-lg content-center justify-items-center'>
                        <LinkBoxes />
                    </section>
                ) : (<section className='bg-white border-2 border-gray-950 w-[100%] lg:w-[40%] shadow-lg h-110 rounded-lg content-center justify-items-center'>
                    <LoginForm />
                </section>
                )}
            </div>
        </>
    )
}

export default Landing;