import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    return jwt.sign(
            payload,
            process.env.JWT_SECRETE,
            {
                algorithm: "HS256",
                expiresIn: process.env.JWT_EXP_IN
            }
        );
        return token;
}


export const verifyToken = () => {

}