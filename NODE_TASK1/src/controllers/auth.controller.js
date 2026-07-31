import { userRegisterService } from '../services/auth.service.js'
import { validationResult } from "express-validator";

export const userRegister = async (req, res) => {
    const validationRes = validationResult(req)
    if(!validationRes.isEmpty()){
        console.log(validationRes.array())
    }else{
        console.log("validation pass")
    }

    // const payload = req.body
    // console.log(payload)
    // try {
    //     const response = await userRegisterService(payload)
    //     return res.status(201).json(response)
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).json({
    //         message: 'Internal server error!',
    //         success: false
    //     })
    // }
}
//extract params