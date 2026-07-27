import { allTodos, todoById, saveTodoRepo } from "../repositories/todo.repository.js"

export const allTodosService = async(filters) => {
    return await allTodos(filters)
}

export const todoByIdService = async(id) =>{
    return await todoById(id)
}

export const saveTodoService = async(todoBody) =>{
    return await saveTodoRepo(todoBody)
}