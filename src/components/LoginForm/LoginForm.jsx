// imports
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { logIn } from '../../services/authService';

// component
const LoginForm = () => {
    //hooks
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // state
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const { username, password } = formData;

    // handler functions 
    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const loggedInUser = await logIn(formData);
            setUser(loggedInUser);
            navigate('/');
        } catch (err) {
            setMessage(err.message);
        }
    }

    const isSignUpValid = () => {
        return !(
            username &&
            password
        );
    };


    // return
    return (
        <div className='flex flex-col bg-white w-[100%] rounded-lg justify-self-center items-center'>
            <h1 className='text-3xl font-bold pt-5 pb-2 md:text-4xl lg:text-5xl border-b-2 border-gray-400 w-[80%] text-center'>Log In</h1>
            <form className='mt-4 w-[80%] md:text-lg' autoComplete='off' onSubmit={handleSubmit}>
                <div className='w-[100%]'>
                    <label className='block text-gray-700 text-l font-bold mb-2' htmlFor="username">Username:</label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Enter Username'
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className='block text-gray-700 text-l font-bold mb-2' htmlFor="password">Password:</label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Enter Password'
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className={`flex justify-self-center px-5 py-2 rounded-full transition-colors ${isSignUpValid() ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-600 text-white"}`} disabled={isSignUpValid()}>Log In</button>
                <p className='flex justify-self-center'>or</p>
                <button className='flex justify-self-center bg-yellow-700 hover:bg-yellow-600 text-white px-5 py-2 rounded-full'><Link to='/signup'>Sign Up</Link></button>
                <p className="text-red-500 justify-self-center mt-1">{message}</p>
            </form>
        </div>
    )
};

// export
export default LoginForm;