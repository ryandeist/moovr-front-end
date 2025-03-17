// imports
import { createContext, useState } from "react"

// hooks
const UserContext = createContext()

// utility functions
const getUserFromToken = () => {
    const token = localStorage.getItem('user')

    if (!token) return null

    return JSON.parse(token)
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