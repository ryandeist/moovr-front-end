// imports
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { login } from '../../services/authService'

// component
const LoginForm = () => {
    //hooks
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    // state
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [message, setMessage] = useState('')
    const { username, password } = formData

    // handler functions 
    const handleChange = (evt) => {
        setMessage('')
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const loggedInUser = await login(formData)
            setUser(loggedInUser)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isSignUpValid = () => {
        return !(
            username &&
            password
        )
    }


    // return
    return (
        <>
            <h1>Login Page</h1>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <p>{message}</p>
                <button disabled={isSignUpValid()}>Sign In</button>
            </form>
        </>
    )
}

// export
export default LoginForm