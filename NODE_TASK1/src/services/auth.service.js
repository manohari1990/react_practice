import { userRegisterRepo, checkDuplicateUser, userLoginRepo } from '../repositories/auth.repository.js'
import bcrypt from "bcrypt";
import {AppError} from "../config/AppError.js"
import { generateToken } from '../utils/jwt.js';

export const userRegisterService = async (payload) => {
    // Check duplicate - select query compare email, username, loop through the result and response back with existing username & email
    try{
        const isDuplicateRec = await(checkDuplicateUser(payload.email, payload.username))
        if(isDuplicateRec){
            const error = {}
            for(const rec of isDuplicateRec) {
                if(rec.username === payload.username) error.username = "Username is already existed."
                if(rec.email === payload.email) error.email = "Email is already existed."
            }
            throw new AppError(409, "User already exists!", error)
        }
        console.info("INFO - No duplicates found!")    // Later Pino or Winston to production logs
    }catch(err){
        // console.error(err)
        throw err
    }
    // Hash password - using bcrypt convert the password into hash and append the it to the payload
    const hashedPassword = await bcrypt.hash(payload.password, 10)
    const updatedPayload = {
        ...payload,
        password: hashedPassword
    }
    try {
        const response = await userRegisterRepo(updatedPayload)
        return response 
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const loginService = async(payload)=>{

    const response = await userLoginRepo(payload)
    if(!response)
        throw new AppError(401, "Invalid Username/Email or Password.", {});

    const comparePassword = await bcrypt.compare(payload.password, response.password)
    if(!comparePassword)
        throw new AppError(401, "Invalid Username/Email or Password.", {});
    if(response.user_status !== 'active')
        throw new AppError(401, "User status is unavailable, Please contact admin.",{});

    const token = generateToken({
        sub: response.user_id,
        username: response.username
    })

    const {password, ...userData} = response
    return {
        user: userData,
        token
    }
}



