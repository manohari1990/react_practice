import { AppError } from '../config/AppError.js';
import { userRegisterService } from '../services/auth.service.js'
import { validationResult } from "express-validator";

export const userRegister = async (req, res) => {
    const validationRes = validationResult(req)
    if(!validationRes.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: validationRes.array()
        })
    }

    const payload = req.body
    try {
        const response = await userRegisterService(payload)
        return res.status(200).json(response)
    } catch (err) {
        // console.error(err)
        if(err instanceof AppError){
            // console.log(err.message)
            return res.status(err.statusCode).json({
                success: false,
                error: err.error,
                message: err.message
            })
        }
        res.status(500).json({
            message: 'Internal server error!',
            success: false
        })
    }
}