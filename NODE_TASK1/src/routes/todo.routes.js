import { Router } from "express";
import { getAllTodos, getTodoById, saveTodo } from "../controllers/todo.controller.js";

const todoRouter = Router()
todoRouter.get('/', getAllTodos)

todoRouter.post('/', saveTodo)

todoRouter.get('/:id', getTodoById) 

export default todoRouter
