// Create the context.
// Create the AuthProvider component.
// Add only the user state.
// Wrap the children with the provider.
// Pass user and setUser through the provider value.

// Don't add login(), logout(), localStorage, or useEffect yet.
import { useState, createContext, useEffect } from "react"
import { USER_STORAGE_KEY } from "../utils/Constants"
import { authenticatedFetch } from "../services/authService"

// 1. Context
export const AuthContext = createContext(null)

// 2. Provider
export function AuthProvider({children}) {
    const [user, setUser] = useState(()=>{
                                const cachedUserData = localStorage.getItem(USER_STORAGE_KEY) === undefined ? null : localStorage.getItem(USER_STORAGE_KEY)
                                return cachedUserData
                            })

    useEffect(()=>{
        const checkSession = async()=>{
            try{
                const resp = await authenticatedFetch()
                if (resp && !resp.success) {
                    logout();
                }
                // setUser(resp)
            }catch(err){
                setUser(null)
                throw err
            }
        }
        checkSession();
    },[])

    const login = (userSession) =>{
        setUser(userSession)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userSession))
        console.info("Login Successful!")
    }

    const updateUser = (updatedInfo) => {
        console.log(updatedInfo,"====================updatedInfo")
        setUser(JSON.stringify(updatedInfo))
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedInfo))
        console.info("User updated!")
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem(USER_STORAGE_KEY)
        console.info("Logout Successful!")
    }

    const restoreUser = () =>{
        setUser(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)))
    }

    return(
        <AuthContext.Provider value={{user, updateUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
