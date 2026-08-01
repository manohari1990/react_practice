import express from 'express';
import cors from 'cors';
import todoRouter from './routes/todo.routes.js';
import authRouter from './routes/auth.routes.js';
import dotenv from 'dotenv';

const app = express()
dotenv.config()

app.use(cors({
    origin: 'http://localhost:8000'
}))
app.use(express.json())

app.get('/', (req, res) => {
    console.log("Todo App")
    res.status(200).json("Todo App is running here")
})

app.use('/todos', todoRouter)
app.use('/auth', authRouter)

app.use((req, res) => {
    res.status(404).json({
        'message': 'Invalue route'
    })
})

export default app;