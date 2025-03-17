import { useContext } from 'react';
// import { getLanding } from '../../services/landingService';
import { UserContext } from '../../contexts/UserContext';
import LoginForm from '../LoginForm/LoginForm';

const Landing = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <section>
                <h1>This is the Landing Page</h1>
            </section>
            {user ? (
                <section>
                    <h1>Welcome {user.username}</h1>
                </section>
            ) : <section>
                    <LoginForm />
                </section>}
        </>
    )
}

export default Landing;