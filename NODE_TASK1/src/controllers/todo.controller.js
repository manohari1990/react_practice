import { allTodosService, todoByIdService, saveTodoService, updateTodoService } from "../services/todo.service.js";

export const getAllTodos = async(req, res) =>{
    const filters = req.query;
    try{
        const allTodos = await allTodosService(filters);
        res.status(200).json(allTodos)
    }catch(error){
        console.error(error)
    }
}

export const saveTodo = async(req, res) =>{
    const todoBody = req.body
    try{
        const response = await saveTodoService(todoBody)
        res.status(201).json(response)
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

export const updateTodo = async(req, res)=>{
    const {id} = req.params
    const todoBody = req.body
    try{
        const response = await updateTodoService(id, todoBody)
        return res.status(200).json(response)
    }catch(err){
        console.error(err)
        res.status(500).json({
            'message': 'Internal Server Error!'
        })
    }
}

export const getTodoById = async(req, res)=>{
    const {id} = req.params
    try{
        const todoItemById = await todoByIdService(id);
        if(!todoItemById){
            return res.status(404).json({
                message: "Todo not found!"
            })
        }
        res.status(200).json(todoItemById)
    }catch(error){
        console.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}