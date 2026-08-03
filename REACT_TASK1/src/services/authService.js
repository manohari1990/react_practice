
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