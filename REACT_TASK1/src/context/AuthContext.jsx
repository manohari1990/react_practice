// Create the context.
// Create the AuthProvider component.
// Add only the user state.
// Wrap the children with the provider.
// Pass user and setUser through the provider value.

// Don't add login(), logout(), localStorage, or useEffect yet.
import { useState, createContext } from "react"
import { USER_STORAGE_KEY } from "../utils/Constants"

// 1. Context
export const AuthContext = createContext(null)

// 2. Provider
export function AuthProvider({children}) {
    const [user, setUser] = useState(()=>{
                                const cachedUserData = localStorage.getItem(USER_STORAGE_KEY) === undefined ? null : localStorage.getItem(USER_STORAGE_KEY)
                                return cachedUserData
                            })

    const login = (userSession) =>{
        setUser(userSession)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userSession))
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem(USER_STORAGE_KEY)
    }

    const restoreUser = () =>{
        setUser(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)))
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
