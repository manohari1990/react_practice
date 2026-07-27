import { allTodos, todoById } from "../repositories/todo.repository.js"

export const allTodosService = async(filters) => {
    return await allTodos(filters)
}

export const todoByIdService = async(id) =>{
    return await todoById(id)
}