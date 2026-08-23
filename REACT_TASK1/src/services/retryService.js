export const fetchWithRetry = async(url, options, retryCount = 3, backOff=1000) =>{
    try{
        const res = await fetch(url, options)
        if(!res.ok){
            if(res.status === 404 || res.status === 401)
                throw new Error(`Client error: ${res.status}`)
            throw new Error(`Server error: ${res.status}`)
        }
        return await res.json()
    }catch(err){
        if(retryCount>0){
            console.warn(`Retrying in ${backOff}ms.. ${retryCount} attempts left!`)
            await new Promise((resolve)=> setTimeout(resolve, backOff))
            return fetchWithRetry(url, options, retryCount - 1, backOff * 2)
        }
        throw err
    }
}