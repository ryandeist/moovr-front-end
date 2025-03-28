// imports
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { Menu, X } from 'lucide-react'
import Logo from '../../../public/images/cow-logo.png'

// component
const NavBar = () => {
    // hooks
    const { user, setUser } = useContext(UserContext);

    // state
    const [isNavOpen, setIsNavOpen] = useState(false)

    // handler functions
    const handleLogOut = () => {
        localStorage.clear();
        setUser(null);
        setIsNavOpen(false);
    };

    const clearTokenForSignUp = () => {
        localStorage.clear();
        setUser(null);
        setIsNavOpen(false);
    };

    // const variables
    const navLinks = user
        ? [
            { name: 'Home', to: '/' },
            { name: 'About', to: '/' },
            { name: 'All Jobs', to: '/jobs' },
            { name: 'New Job', to: '/jobs/add-job' },
            { name: 'Log Out', to: '/', onClick: handleLogOut, buttonStyle: true },
        ] : [
            { name: 'Home', to: '/' },
            { name: 'About', to: '/' },
            { name: 'Sign Up', to: '/signup', onClick: clearTokenForSignUp, buttonStyle: true },
        ];

    // return
    return (
        <nav className='flex bg-white items-center justify-between px-[4%] shadow-lg relative mx-auto'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center'>
                    <div>
                        <Link to='/'>
                            <img className='w-16 md:w-18 lg:w-20' src={Logo} alt="cardboard box logo" />
                        </Link>
                    </div>
                    <div className='text-3xl md:text-4xl lg: text-5xlflex justify-self-start'>
                        Moovr
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-2 justify-between'>
                    <ul className='flex gap-3 flex-col md:flex-row md:justify-between md:text-lg lg:text-xl'>
                        {navLinks.map((item, index) => (
                            <li key={index} className='hover:text-gray-500'>
                                {item.buttonStyle ? (
                                    <button>
                                        <Link
                                            className='bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 rounded-full'
                                            to={item.to}
                                            onClick={item.onClick ? item.onClick : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    </button>
                                ) : (
                                    <Link to={item.to} onClick={item.onClick ? item.onClick : undefined}>
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <button className='md:hidden' onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div
                className={`absolute top-full left-0 w-full bg-white z-40 border-b-2 border-gray-950 transition-all duration-300 ease-in-out overflow-hidden ${isNavOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className='bg-white text-center py-4 space-y-2'>
                    {navLinks.map((item, index) => (
                        <li key={index} className='hover:text-gray-500'>
                            {item.buttonStyle ? (
                                <button>
                                    <Link
                                        className='bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 rounded-full'
                                        to={item.to}
                                        onClick={item.onClick ? item.onClick : () => setIsNavOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </button>
                            ) : (
                                <Link to={item.to} onClick={item.onClick ? item.onClick : () => setIsNavOpen(false)}>
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav >
    )
};

//export
export default NavBar;