import { query } from '../config/database.js'
import { buildInsertQuery } from '../utils/helpers.js'
import {NEW_UPDATE_USER_RETURN_FROM_DB} from '../Constant.js'

export const userRegisterRepo = async (payload) => {
    const {sql, values} = buildInsertQuery(payload, "users", NEW_UPDATE_USER_RETURN_FROM_DB)
    console.log(sql, values)
    // SQL to save new user
    try{
        const response = await query(sql, values)
        return (response.rows.length > 0) ? {
            'success': true,
            'records': response.rows[0],
            'message': 'New user created successfully!'
        }:{
            'success': true,
            'records': []
        }
    } catch (err) {
        console.error(err)
        if (err.code === '23505') {
            throw new AppError(409, 'Username or email already exists');
        }
        throw err
    }
}


export const checkDuplicateUser = async(email, username) =>{
    const sql = `SELECT email, username FROM users WHERE email = $1 OR username = $2`
    try{
        const dupRecords = await query(sql,[email, username])
        if (dupRecords.rowCount > 0)
            return dupRecords.rows
    }catch(err){
        console.error(err)
        throw err;
    }
}


export const userLoginRepo = async(payload)=>{
    const sql = `SELECT ${NEW_UPDATE_USER_RETURN_FROM_DB.join(", ")}, password FROM users WHERE email = $1 OR username = $1`
    try{
        const response = await query(sql, [payload.login])
        if(response.rowCount > 0) 
            return response.rows[0]
    }catch(err){
        throw err
    }
}

export const saveUserSessionRepo = async(payload) =>{
    const {sql, values} = buildInsertQuery(payload, "user_sessions")
    try{
        const response = await query(sql, values)
        if(response.rowCount > 0)
            return response.rows[0]
    }catch(err){
        throw err
    }
}