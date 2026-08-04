import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    const access_token = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            {
                algorithm: "HS256",
                expiresIn: process.env.JWT_ACCESS_EXP_IN
            }
        );
    
    const refresh_token = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_REFRESH_EXP_IN
        }
    )
    return {refresh_token, access_token}
}


export const verifyToken = (token) => {
    try{
        const obj = jwt.verify(token.access_token, process.env.JWT_ACCESS_SECRET)
        return obj
    }catch(err){
        console.error(`ERROR: ${err}`)
        throw err
    }
}