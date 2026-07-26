import { Router } from "express";
import { getAllTodos, getTodoById } from "../controllers/todo.controller.js";

const todoRouter = Router()
todoRouter.get('/',getAllTodos)

todoRouter.get('/:id',getTodoById)

export default todoRouter
