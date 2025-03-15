// imports
import { createContext, useState } from "react"

// hooks
const UserContext = createContext()

// utility functions
const getUserFromToken = () => {
    const username = localStorage.getItem('username')

    if (!username) return null

    return username
}

// context
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromToken)

    const value = { user, setUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// export
export { UserProvider, UserContext }