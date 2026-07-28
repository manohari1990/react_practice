
function buildQuery(todoBody){
    const columns = []
    const values = []
    const placeholders = []
    let count = 1
    for(const key in todoBody){
        columns.push(key)
        values.push(todoBody[key])
        placeholders.push(`$${count++}`)
    }
    return {columns, values, placeholders}
}

export function buildInsertQuery(todoBody){
    const {columns, values, placeholders} = buildQuery(todoBody)
    const sql = `INSERT INTO user_todos( ${columns.join(', ')} ) VALUES( ${placeholders.join(', ')} ) RETURNING *`
    return {sql, values}
}


export function buildUpdateQuery(id, todoBody){
    const {columns, values, placeholders} = buildQuery(todoBody)
    const newValues = [...values, id]
    const updateSet = columns.map((col,ind)=>  `${col}=${placeholders[ind]}`)
    const sql = `UPDATE user_todos SET ${updateSet.join(', ')} WHERE todo_id = $${placeholders.length+1} RETURNING *`
    return {sql, newValues}
}