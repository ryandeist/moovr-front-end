// imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signUp } from "../../services/authService";

// components
const SignUpForm = () => {
    // hooks
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // state variables
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [message, setMessage] = useState("");
    const { username, password, passwordConfirm } = formData;

    // handler functions
    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate("/");
        } catch (err) {
            setMessage(err.message);
        };
    };

    // predicate function
    const isSignUpValid = () => {
        return !(
            username &&
            password &&
            password.length >= 7 &&
            password === passwordConfirm
        );
    };

    // return
    return (
        <div className="flex flex-col border-2 border-e-gray-950 bg-white w-[90%] shadow-lg h-auto pb-5 rounded-lg justify-self-center items-center mt-5 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold pt-5 pb-2 border-b-2 border-gray-400 w-[80%] text-center">Sign Up</h1>
            <form className="mt-4 w-[80%] md:text-lg" autoComplete="off" onSubmit={handleSubmit}>
                <div className="w-[100%]">
                    <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="username">Username:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter a Username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-xs mb-5">*Letters, Numbers, and @,_,.,- only</p>
                </div>
                <div className="w-[100%]">
                    <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="password">Password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-xs mb-5">*Must be greater then six characters</p>
                </div>
                <div className="w-[100%]">
                    <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="confirm">Confirm Password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="confirm"
                        name="passwordConfirm"
                        placeholder="Must match password"
                        value={passwordConfirm}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-xs mb-5">*Must match password</p>
                </div>
                <button className={`flex justify-self-center px-5 py-2 rounded-full transition-colors ${isSignUpValid() ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-600 text-white"}`} disabled={isSignUpValid()}>Sign Up</button>
                <p className="text-red-500 justify-self-center mt-1">{message}</p>
            </form>
        </div>
    )
};

// exports
export default SignUpForm;