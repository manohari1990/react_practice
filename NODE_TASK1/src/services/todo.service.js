import { allTodos, todoById } from "../repositories/todo.repository.js"

export const allTodosService = async() => {
    return await allTodos()
}

export const todoByIdService = async(id) =>{
    return await todoById(id)
}