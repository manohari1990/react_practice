import express from 'express'
import todoRouter from './routes/todo.routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    console.log("Todo App")
    res.status(200).json("Todo App is running here")
})

app.use('/todos', todoRouter)

app.use((req, res)=>{
    res.status(404).json({
        'message': 'Invalue route'
    })
})

export default app;