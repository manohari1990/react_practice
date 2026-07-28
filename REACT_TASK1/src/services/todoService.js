
const HOST_URL = 'http://localhost:5000'
const HEADERS = { 'Content-Type': 'application/json' } // Alerts server you are sending JSON

export const getAllTodos = async(params) =>{
    try{
        const todos = await fetch(`${HOST_URL}/todos?${params}`)
        console.log(todos.ok, 'todo.ok')
        console.log(todos.status, 'todo.status')
        if(!todos.ok){
            throw new Error("Failed to fetch from DB!")
        }
        return await todos.json()
    }catch(error){
        console.log(error)
        throw error
    }
}

export const saveTodo = async(formData) => {
    console.log(JSON.stringify(formData), 'formData')
    try{
        const response = await fetch(`${HOST_URL}/todos`, {method: 'POST', headers:HEADERS, body: JSON.stringify(formData)})
        if(!response.ok){
            throw new Error("Failed to saved!")
        }
        return await response.json()
    }catch(error){
        console.error(error)
        throw error
    }
}

export const updateTodo = async(id, formData) =>{
    console.log(id, formData)
    try{
        const response = await fetch(`${HOST_URL}/todos/${id}`,{ method: 'PUT', headers:HEADERS, body:JSON.stringify(formData) })
        if(!response.ok){
            throw new Error("Failed to update!") 
        }
        return await response.json()
    }catch(err){
        console.error(err)
        throw err
    }
}