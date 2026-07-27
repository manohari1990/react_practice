import { Router } from "express";
import { getAllTodos, getTodoById, newTodo } from "../controllers/todo.controller.js";

const todoRouter = Router()
todoRouter.get('/',getAllTodos)

todoRouter.post('/',newTodo)

todoRouter.get('/:id',getTodoById)

export default todoRouter
