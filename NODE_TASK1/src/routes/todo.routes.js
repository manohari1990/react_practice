import { Router } from "express";
import { getAllTodos, getTodoById, saveTodo, updateTodo } from "../controllers/todo.controller.js";

const todoRouter = Router()
todoRouter.get('/', getAllTodos)

todoRouter.post('/', saveTodo)

todoRouter.put('/:id', updateTodo)

todoRouter.get('/:id', getTodoById) 

export default todoRouter
