
function buildQuery(payload){
    const columns = []
    const values = []
    const placeholders = []
    let count = 1
    for(const key in payload){
        columns.push(key)
        values.push(payload[key])
        placeholders.push(`$${count++}`)
    }
    return {columns, values, placeholders}
}

export function buildInsertQuery(payload, tableName, returns="*"){
    const {columns, values, placeholders} = buildQuery(payload)
    const sql = `INSERT INTO ${tableName}( ${columns.join(', ')} ) VALUES( ${placeholders.join(', ')} ) RETURNING ${returns.join(', ')}`
    return {sql, values}
}


export function buildUpdateQuery(id, payload){
    const {columns, values, placeholders} = buildQuery(payload)
    const newValues = [...values, id]
    const updateSet = columns.map((col,ind)=>  `${col}=${placeholders[ind]}`)
    const sql = `UPDATE user_todos SET ${updateSet.join(', ')} WHERE todo_id = $${placeholders.length+1} RETURNING *`
    return {sql, newValues}
}