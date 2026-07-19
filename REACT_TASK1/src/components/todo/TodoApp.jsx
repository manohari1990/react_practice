// Should own the states

import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoFilters from './TodoFilters'

function TodoApp() {

    const [input, setInput] = useState('')
    const [todoItems, setTodoItems] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedUpdateId, setSelectedUpdateId] = useState(null)
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    let filteredTodos =
        (filter === 'all')
            ? todoItems
            : todoItems.filter(item => {
                if (item.status === filter) return item
            })

    const lowerSearchText = search.trim().toLowerCase()
    filteredTodos = filteredTodos.filter((item)=>{ return item.value.toLowerCase().includes(lowerSearchText)})

    const handleAddTodo = () => {

        if (input.trim() === '') return;

        let newTodo = {
            'id': Date.now(),
            'value': input,
            'status': 'active'
        }
        setTodoItems((prev) => {
            return [newTodo, ...prev]
        })
        console.log(todoItems)
        setInput('')
    }

    const handleDelete = (id) => {
        const filteredList = todoItems.filter(item => item.id !== id)
        setTodoItems(filteredList)
    }

    const handleEdit = (id) => {
        const item = todoItems.find(item => item.id === id)
        if (!item) return;
        setSelectedUpdateId(item.id)
        setIsUpdate(true)
        setInput(item.value)
    }

    const handleCancelUpdate = () => {
        setSelectedUpdateId(null)
        setIsUpdate(false)
        setInput('')
    }

    const handleStatus = (status, id) => {
        console.log(status, id)
        const updatedList = todoItems.map(todo => {
            return id === todo.id
                ? {
                    ...todo,
                    'status': status ? 'completed' : 'active'
                } :
                todo
        })
        console.log(updatedList)
        setTodoItems(updatedList)
    }

    const handleUpdateItem = () => {
        if (input.trim() === '') return;
        const updatedList = todoItems.map(todo => {
            return selectedUpdateId === todo.id
                ? {
                    ...todo,
                    'value': input
                } :
                todo
        })
        setTodoItems(updatedList)
        handleCancelUpdate()
    }

    const handleInputChange = (value) => {
        setInput(value)
    }

    const handleFilter = (selectedLabel) => {
        setFilter(selectedLabel)
    }

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm)
    }

    return (
        <div>
            <TodoFilters handleFilter={handleFilter} activeFilter={filter} handleSearch={handleSearch} />
            <TodoInput input={input} handleAddTodo={handleAddTodo} handleUpdateItem={handleUpdateItem} handleCancelUpdate={handleCancelUpdate} handleInputChange={handleInputChange} isUpdate={isUpdate} />
            <TodoList filteredTodos={filteredTodos} handleDelete={handleDelete} handleEdit={handleEdit} handleStatus={handleStatus} />
        </div>
    )
}

export default TodoApp