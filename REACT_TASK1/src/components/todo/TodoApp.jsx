// Should own the states

import { useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"

function TodoApp(){

    const [input, setInput] = useState('')
    const [todoItems, setTodoItems] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedUpdateId, setSelectedUpdateId] = useState(null)

    const handleAddTodo = () => {

        if(input.trim() === '') return;

        let newTodo = {
            'id': Date.now(),
            'value': input
        }
        setTodoItems((prev) => {
            return [newTodo, ...prev]
        })
        setInput('')
    }

    const handleDelete = (id) =>{
        const filteredList = todoItems.filter(item => item.id !== id)
        setTodoItems(filteredList)
    }

    const handleEdit = (id) =>{
        const item = todoItems.find(item => item.id === id)
        if (!item) return;
        setSelectedUpdateId(item.id)
        setIsUpdate(true)
        setInput(item.value)
    }

    const handleCancelUpdate = () =>{
        setSelectedUpdateId(null)
        setIsUpdate(false)
        setInput('')
    }

    const handleUpdateItem = () =>{
        if(input.trim() === '') return;
        const updatedList = todoItems.map(todo=>{
            return selectedUpdateId === todo.id 
                ? {
                    ...todo,
                    value: input
                } :
                todo
        })
        setTodoItems(updatedList)
        handleCancelUpdate()
    }

    const handleInputChange = (value) => {
        setInput(value)
    }

    return (
        <div>
            <TodoInput input={input} handleAddTodo={handleAddTodo} handleUpdateItem={handleUpdateItem} handleCancelUpdate={handleCancelUpdate} handleInputChange={handleInputChange} isUpdate={isUpdate} />
            <TodoList list={todoItems} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
    )
}

export default TodoApp