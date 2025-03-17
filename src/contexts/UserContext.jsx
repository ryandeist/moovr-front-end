// imports
import { createContext, useState } from "react";

// hooks
const UserContext = createContext();

// utility functions
const getUserFromToken = () => {
    const user = localStorage.getItem('user');

    if (!user) return null;

    return JSON.parse(user);
}

// context
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromToken);

    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

// export
export { UserProvider, UserContext }