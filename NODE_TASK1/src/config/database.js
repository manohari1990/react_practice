import {Pool} from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_management',
    password: 'root',
    port: 5433
})

// Check DB connection
pool.connect()
    .then(()=> console.log("PGSQL connected"))
    .catch(err => console.error(err))

export const query = (text, params) => pool.query(text, params)
