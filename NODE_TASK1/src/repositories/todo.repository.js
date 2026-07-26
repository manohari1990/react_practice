import { query } from '../config/database.js'

export const allTodos = async() =>{
    try{
        const result = await query('select * from user_todos')
        return result.rows
    }catch(err){
        console.error(err)
    }
}

export const todoById = async(id) =>{
    try{
        const result = await query('select * from user_todos where todo_id = $1', [id])
        return result.rows[0]
    }catch(err){
        console.error(err)
        throw err;
    }
}