// imports
import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { signUp } from "../../services/authService"

// components
const SignUpForm = () => {
    // hooks
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    // state variables
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    })
    const [message, setMessage] = useState("")
    const { username, password, passwordConfirm } = formData

    // handler functions
    const handleChange = (evt) => {
        setMessage("")
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        try {
            const newUser = await signUp(formData)
            setUser(newUser)
            navigate("/")
        } catch (err) {
            setMessage(err.message)
        }
    }

    // predicate function
    const isSignUpValid = () => {
        return !(
            username &&
            username.length >= 5 &&
            password &&
            password.length >= 6 &&
            password === passwordConfirm
        )
    }

    // return
    return (
        <>
            <h1>Sign Up Page</h1>
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
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        name="passwordConfirm"
                        placeholder="Must be at least 6 characters"
                        value={passwordConfirm}
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

export default SignUpForm