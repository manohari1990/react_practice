
const HOST_URL = "http://localhost:5000";
const HEADERS = { 'Content-Type': 'application/json' } 

export const userLogin = async(login, password) =>{
    try{
        const response = await fetch(`${HOST_URL}/auth/login`, {method: 'POST', body: JSON.stringify({login, password}), headers:HEADERS, credentials: 'include' })
        if(!response.ok)
            throw new Error("User authentication failed!!")
        return await response.json()
    }catch(err){
        throw err
    }
}

export const registerUser = async(formData) =>{
    try{
        const response = await fetch(`${HOST_URL}/auth/register`, {method: 'POST', headers: HEADERS, body: JSON.stringify(formData)})
        if(!response.ok)
            throw new Error("Could not create user, please try again!")
        return await response.json()
    }catch(err){
        throw err
    }
}

export const handleLogout = async() =>{
    try{
        const response = await fetch(`${HOST_URL}/auth/logout`, {method:'POST', headers: HEADERS, credentials:'include'})
        if(!response.ok)
            throw new Error("Logout request failed, please try again later!")
        return await response.json()
    }catch(err){
        throw err
    }
}

export const authenticatedFetch = async() =>{
    try{
        const response = await fetch(`${HOST_URL}/auth/refresh`,{method: 'POST', headers: HEADERS, credentials: 'include'})
        if(response.ok)
            return await response.json();
    }catch(err){
        throw err
    }
}