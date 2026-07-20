// Should own the states

import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoFilters from './TodoFilters'
import {sortedList} from '../../utils/helpers' 

function TodoApp() {

    const localTodos = localStorage.getItem('todoItems')
    const savedTodos = localTodos != null ? JSON.parse(localTodos) : []  // !!! can be improved lazy initialization !!!
    const [input, setInput] = useState('')
    const [todoItems, setTodoItems] = useState(savedTodos)
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedUpdateId, setSelectedUpdateId] = useState(null)
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [seletedSortOption, setSeletedSortOption] = useState('newest')
    
    let filteredTodos = todoItems.length > 0 ?
        (filter === 'all')
            ? todoItems
            : todoItems.filter(item => {
                if (item.status === filter) return item
            }) : []
    const lowerSearchText = search.trim().toLowerCase()
    filteredTodos = filteredTodos.filter((item)=>{ return item.value.toLowerCase().includes(lowerSearchText)})
    filteredTodos = sortedList(filteredTodos, seletedSortOption) // Basic Sort

    useEffect(()=>{
        const stringifyTodo = JSON.stringify(todoItems)
        localStorage.setItem('todoItems', stringifyTodo)
        console.log(todoItems,'ppp')
    },[todoItems])

    const handleAddTodo = () => {

        if (input.trim() === '') return;
        let newTodo = {
            'id': Date.now(),
            'value': input,
            'status': 'active',
            'createdAt': Date.now()
        }
        setTodoItems((prev) => {
            return [newTodo, ...prev]
        })
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
        const updatedList = todoItems.map(todo => {
            return id === todo.id
                ? {
                    ...todo,
                    'status': status ? 'completed' : 'active'
                } :
                todo
        })
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
    const handleSort = (selectedOption) =>{
        setSeletedSortOption(selectedOption)
    }

    return (
        <div>
            <TodoFilters handleFilter={handleFilter} activeFilter={filter} handleSearch={handleSearch} seletedSortOption={seletedSortOption} handleSort={handleSort} />
            <TodoInput input={input} handleAddTodo={handleAddTodo} handleUpdateItem={handleUpdateItem} handleCancelUpdate={handleCancelUpdate} handleInputChange={handleInputChange} isUpdate={isUpdate} />
            <TodoList filteredTodos={filteredTodos} handleDelete={handleDelete} handleEdit={handleEdit} handleStatus={handleStatus} />
        </div>
    )
}

export default TodoApp