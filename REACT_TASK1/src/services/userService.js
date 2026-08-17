import { HOST_URL } from "../utils/Constants"


export const uploadUserProfile = async(payload) =>{
    console.log(payload)
    try{
        const res = await fetch(`${HOST_URL}/user/upload`, {method: 'PATCH', body: payload, credentials: 'include'})
        if(!res.ok)
            throw new Error("Something went wrong!")
        return await res.json()
    }catch(err){
        console.error(err)
        throw err
    }
}