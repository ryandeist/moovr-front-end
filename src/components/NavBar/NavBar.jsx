// imports
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { Menu, X } from 'lucide-react'
import Logo from '../../../public/images/cardboard-box-logo.png'

// component
const NavBar = () => {
    // hooks
    const { user, setUser } = useContext(UserContext);
    const [isNavOpen, setIsNavOpen] = useState(false)

    // const variables
    const navLinks = user
        ? [
            { name: 'Home', to: '/' },
            { name: 'About', to: '/' },
            { name: 'All Jobs', to: '/jobs' },
            { name: 'Create a Job', to: '/jobs/create' },
            { name: 'Log Out', to: '/', onClick: handleLogOut },
        ] : [
            { name: 'Home', to: '/' },
            { name: 'About', to: '/' },
            { name: 'Sign Up', to: '/signup', onClick: clearTokenForSignUp, buttonStyle: true },
        ]

    // handler functions
    const handleLogOut = () => {
        localStorage.clear();
        setUser(null);
    };

    const clearTokenForSignUp = () => {
        localStorage.clear();
        setUser(null);
    };

    // return
    return (
        <nav className='flex bg-white items-center justify-between px-10 shadow-lg relative'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center'>
                    <div>
                        <Link to='/'>
                            <img className='w-16' src={Logo} alt="cardboard box logo" />
                        </Link>
                    </div>
                    <div className='text-3xl flex justify-self-start'>
                        Moovr
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-2 justify-between'>
                    <ul className='flex gap-3 flex-col md:flex-row md:justify-between'>
                        {navLinks.map((item, index) => (
                            <li key={index} className='hover:text-gray-500'>
                                {item.buttonStyle ? (
                                    <button>
                                        <Link
                                            className='bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-500'
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
                className={`absolute top-full left-0 w-full bg-white transition-all duration-300 ease-in-out overflow-hidden ${isNavOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className='bg-white text-center py-4 space-y-2'>
                    {navLinks.map((item, index) => (
                        <li key={index} className='hover:text-gray-500'>
                            {item.buttonStyle ? (
                                <button>
                                    <Link
                                        className='bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-500'
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
        </nav >
    )
};

//export
export default NavBar;