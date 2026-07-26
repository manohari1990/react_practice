import { Router } from "express";

const todoRouter = Router()

todoRouter.get('/',(req, res)=>{
    res.status(200).json([
        {
            id:2,
            title: 'Get API - in NodeJS-Express JS',
            details: 'Creating new APIs using express js',
            priority: 'high',
            dueDate: '26-07-2026',
            createdAt: '',
            udatedAt: ''
        },
        {
            id:1,
            title: 'Creating new app - in NodeJS-Express JS',
            details: 'Created new app using Express JS',
            priority: 'high',
            dueDate: '26-07-2026',
            createdAt: '',
            udatedAt: ''
        }
    ])
})

todoRouter.get('/:id',(req, res)=>{
    res.status(200).json({
        id:1,
        title: 'Get API - in NodeJS-Express JS',
        details: 'Creating new APIs using express js',
        priority: 'medium',
        dueDate: '26-07-2026',
        createdAt: '',
        udatedAt: ''
    })
})

export default todoRouter
