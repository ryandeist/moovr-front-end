import { useContext } from 'react';
// import { getLanding } from '../../services/landingService';
import { UserContext } from '../../contexts/UserContext';
// import LoginForm from '../LoginForm/LoginForm';

const Landing = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <div>
                <h1>This is the Landing Page</h1>
            </div>
            {user ? (
                <h1> Welcome {user.username}</h1>
            ) : <h1>Log In</h1>}
        </>
    )
}

export default Landing;