import { Router } from "express";
import { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodoById } from "../controllers/todo.controller.js";

const todoRouter = Router()
todoRouter.get('/', getAllTodos)

todoRouter.post('/', saveTodo)

todoRouter.put('/:id', updateTodo)

todoRouter.delete('/:id', deleteTodoById)

todoRouter.get('/:id', getTodoById) 

export default todoRouter
