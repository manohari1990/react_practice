import { Router } from "express";
import { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodoById } from "../controllers/todo.controller.js";
import { verifyRequestAuth } from "../middleware/authenticate.js";

const todoRouter = Router()
todoRouter.get('/', verifyRequestAuth, getAllTodos)

todoRouter.post('/', verifyRequestAuth, saveTodo)

todoRouter.put('/:id', verifyRequestAuth, updateTodo)

todoRouter.delete('/:id', verifyRequestAuth, deleteTodoById)

todoRouter.get('/:id', verifyRequestAuth, getTodoById) 

export default todoRouter
