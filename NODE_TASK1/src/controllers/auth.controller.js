import { AppError } from '../config/AppError.js';
import { userRegisterService, loginService } from '../services/auth.service.js'
import { validationResult } from "express-validator";

export const userRegister = async (req, res) => {
    const validationRes = validationResult(req)
    if(!validationRes.isEmpty()){
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            error: validationRes.array()
        })
    }

    const payload = req.body
    try {
        const response = await userRegisterService(payload)
        return res.status(201).json(response)
    } catch (err) {
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                error: err.error,
                message: err.message
            })
        }
        res.status(500).json({
            message: 'Internal server error!',
            error: err,
            success: false
        })
    }
}


export const userLogin = async(req, res) =>{
    const validateRes = validationResult(req)
    if(!validateRes.isEmpty())
        return res.status(400).json({
                success: false,
                message: "Validation errors",
                error: validateRes.array()
            })

    const payload = req.body
    try{
        const response = await loginService(payload)
        return res.status(200).json({
            success: true,
            message: "Login successfully!",
            records: [response]
        })
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
                error: err.error
            })
        }
        return res.status(500).json({
            success:false,
            message: "Internal server error!",
            error: err
        })
    }
}