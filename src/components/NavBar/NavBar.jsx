// imports
import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

// component
const NavBar = () => {
    // hooks
    const { user, setUser } = useContext(UserContext);

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
        <nav>
            <div>
                <Link to='/'>Home</Link>
            </div>
            { user ? (
                <div>
                    <ul>
                        <li><Link to='/jobs'>All Jobs</Link></li>
                        <li><Link to='/jobs/create'>Create a Job</Link></li>
                        <li><Link to='/' onClick={() => {handleLogOut()}}>Log Out</Link></li>
                    </ul>
                </div>
            ) : (
                <div>
                    <ul>
                        <li><Link to='/signup' onClick={() => {clearTokenForSignUp()}}>Sign Up</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    )
};

//export
export default NavBar;