import { userRegisterRepo } from '../repositories/auth.repository.js'

export const userRegisterService = async (payload) => {



    // Check duplicate - select query compare email, username, loop through the result and response back with existing username & email
    // code here....
    // ↓
    // Hash password - using bcrypt convert the password into hash and append the it to the payload
    // code here....
    // ↓
    const updatedPayload = payload
    // Repository
    try {
        const response = await userRegisterRepo(updatedPayload)
    } catch (err) {
        console.log(err)
    }
}





