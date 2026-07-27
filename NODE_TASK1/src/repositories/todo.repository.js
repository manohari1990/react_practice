import { query } from '../config/database.js'
import { DEFAULT_PAGE_LIMIT, DEFAULT_SORT_BY, DEFAULT_ORDER, allowedSortFields } from '../Constant.js'

export const allTodos = async(filters) =>{
    const conditions = []
    const values = []
    let sql = 'SELECT * FROM user_todos'
    
    if(filters.search){
        conditions.push(` ( title ILIKE $${values.length + 1} OR details ILIKE $${values.length + 1} ) `)
        values.push(`%${filters.search}%`)
    }
    if(filters.priority){
        conditions.push(`priority = $${values.length + 1}`)
        values.push(filters.priority)
    }
    if(filters.status){
        conditions.push(`status = $${values.length + 1}`)
        values.push(filters.status)
    }

    if(conditions.length > 0){
        sql += " WHERE "+ conditions.join(" AND ")
    }
    
    const sortBy = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : DEFAULT_SORT_BY
    const order = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : DEFAULT_ORDER
    sql += ` ORDER BY ${sortBy} ${order} `

    console.log(sql)
    console.log(values)

    try{
        const result = await query(sql,values)
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