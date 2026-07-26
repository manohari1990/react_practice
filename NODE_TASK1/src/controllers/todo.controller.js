import { allTodosService, todoByIdService } from "../services/todo.service.js";

export const getAllTodos = async(req, res) =>{
    try{
        const allTodos = await allTodosService();
        res.status(200).json(allTodos)
    }catch(error){
        console.error(error)
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